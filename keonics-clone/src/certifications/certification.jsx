import React from 'react';
import axios from 'axios';
import Select from 'react-select';

import './certification.css';
import BASE_URL from '../appconst';

class Certification extends React.Component{
    constructor(){
        super();
        this.state = {
            courselist:[],
            studentList:[],
            certifications:[],
            studentid:'',
            courseid:''
        }
    }

    componentDidMount(){
        if(localStorage.getItem("user_role") === "center"){
            axios({
                method:'get',
                url:BASE_URL+'/certifications/'+localStorage.getItem("center_id"),
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                } 
            }).then(res => {
                let certification = []
                res.data.map(row => {
                    certification.push({"id":row[0],"student":row[4],"course":row[5],
                                        "status":row[6],"center":row[7]});
                })
                this.setState({certifications:certification});
            }).catch(error => {
                alert(error.message);
            });
        }
        else{
            axios({
                method:'get',
                url:BASE_URL+'/certifications',
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                } 
            }).then(res => {
                let certification = []
                res.data.map(row => {
                    certification.push({"id":row[0],"studentid":row[1],"courseid":row[2],"centerid":row[3],"student":row[4],"course":row[5],
                                        "status":row[6],"center":row[7]});
                })
                this.setState({certifications:certification});
            }).catch(error => {
                alert(error.message);
            });
        }

        axios({
            method:'get',
            url:BASE_URL+'/courseList',
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            } 
        }).then(res => {
            let courses = []
            res.data.map(row => {
                courses.push({value:row[0], label:row[1]});
            })
            this.setState({courselist:courses});
        }).catch(error => {
            alert(error.message);
        });
        if(localStorage.getItem("user_role") === 'center'){
            axios({
                method:'get',
                url:BASE_URL+"/listStudents/"+localStorage.getItem("user_id"),
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                let students = []
                res.data.map(row => {
                    students.push({"value":row[0],"label":row[1]})
                })
                this.setState({studentList:students})
            }).catch(error => {
                alert(error.message)
            })
        }
    }

    handleChangestudent = (data) => {
        this.setState({studentid:data.value});
    }

    handleChangecourse = (data) => {
        this.setState({courseid:data.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        axios({
            method:'post',
            url:BASE_URL+'/addCerification',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "status":"new",
                "student":{
                    "id":this.state.studentid
                },
                "course":{
                    "id":this.state.courseid
                },
                "center":{
                    "id":localStorage.getItem("center_id")
                }
            }
        }).then(res => {
            alert("Certification Added Waiting for approval");
        }).catch(error => {
            alert(error.message);
        })
        this.componentDidMount()
    }

    approve = (row) =>{
        axios({
            method:'post',
            url:BASE_URL+'/addCerification',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "id":row.id,
                "student":{
                    "id":row.studentid
                },
                "course":{
                    "id":row.courseid
                },
                "center":{
                    "id":row.centerid
                }
            }
        }).then(res => {
            alert("Certification approved");
        }).catch(error => {
            alert(error.message);
        })
        this.componentDidMount()
    }

    deleteCertification = (id) => {
        axios({
            method:'delete',
            url:BASE_URL+"/deletecertification/"+id,
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            alert("Certification Deleted")
        }).catch(error => {
            alert(error.message)
        })
    }

    render(){
        return(
            <div className="certification">
                <div className="form__certifiction">
                 <h1>Request for Cetification</h1>   
                <form onSubmit = {this.handleSubmit}>
                    <label className = "form__label">Student</label>
                    <Select options={this.state.studentList} onChange = {this.handleChangestudent}></Select>
                    <label className = "form__label">Course</label>
                    <Select options = {this.state.courselist} onChange = {this.handleChangecourse}></Select>
                    {
                        localStorage.getItem("user_role") === "center"?
                            <input type="submit" value="submit"/>
                        :<input type="submit" value="submit" disabled="true" className = "disable"/>
                    }
                </form>
                </div>
                <div className="table">
                    <table border="1">
                        <thead>
                            <th>Student Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Center</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                               this.state.certifications.map(row => (
                                   <tr key={row.id}>
                                       <td>{row.student}</td>
                                       <td>{row.course}</td>
                                       <td>{row.status}</td>
                                       <td>{row.center}</td>
                                       {
                                           localStorage.getItem("user_role") !== "center"?
                                                row.status !== "approved"?
                                                    <td><button style = {{backgroundColor:"green"}} onClick = {e => this.approve(row)}>Approve</button></td>
                                                :<td></td>
                                           :row.status !== "approved"?
                                                <td><button onClick = {e => this.deleteCertification(row.id)}>Delete</button></td> 
                                            :<td></td>
                                        } 
                                   </tr>
                               )) 

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Certification;