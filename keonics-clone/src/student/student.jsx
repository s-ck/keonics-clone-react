import React from 'react';
import axios from 'axios';

import './student.css';
import BASE_URL from '../appconst';

class Student extends React.Component{
    constructor(){
        super();
        this.state = {
            studentList:[],
            firstname:'',
            lastname:'',
            gender:'',
            email:'',
            mobile:'',
            address1:'',
            address2:'',
            city:'',
            pincode:'',
        }
    }

    componentDidMount(){
        if(localStorage.getItem("user_role") === "center"){
            axios({
                'method':'get',
                'url':BASE_URL+'/centers/'+localStorage.getItem("user_id"),
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                localStorage.setItem("center_id",res.data[0].id);
            }).catch(error =>{
                alert(error.message);
            })
        }
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
                    students.push({"id":row[0],"firstname":row[1],
                    "lastname":row[2],"email":row[3],"mobile":row[4],
                    "address":row[6]+" "+row[7],"city":row[8],"pincode":row[9],"center":row[10]})
                })
                this.setState({studentList:students})
            }).catch(error => {
                alert(error.message)
            })
        }
        else{
            axios({
                method:'get',
                url:BASE_URL+"/listStudents",
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                let students = []
                res.data.map(row => {
                    students.push({"id":row[0],"firstname":row[1],
                    "lastname":row[2],"email":row[3],"mobile":row[4],
                    "address":row[6]+" "+row[7],"city":row[8],"pincode":row[9],"center":row[10]})
                })
                this.setState({studentList:students})
            }).catch(error => {
                alert(error.message)
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method:'post',
            url:BASE_URL+'/addStudent',
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "firstname":this.state.firstname[0],
                "lastname":this.state.lastname[0],
                "gender":this.state.gender[0],
                "email":this.state.email[0],
                "mobile_num":this.state.mobile[0],
                "address1":this.state.address1[0],
                "address2":this.state.address2[0],
                "city":this.state.city[0],
                "pincode":this.state.pincode[0],
                "center":{
                    "id":localStorage.getItem("center_id")
                }
            } 
        }).then(res => {
            alert("Student Saved Successfully")
        }).catch(error => {
            alert(error.message)
        })
    }

    deleteStudent = (id) => {
        if(window.confirm("This student will be deleted permently")){
            axios({
                method:'delete',
                url:BASE_URL+'/deleteStudent/'+id,
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                alert("Student deleted successfully")
            }).catch(error => {
                alert(error.message)
            })
        }
        this.componentDidMount()
    }

    render(){
        return(
            <div className="student">
                <div className="student__form">
                    <form onSubmit = {this.handleSubmit}>
                        <label>First Name</label>
                        <input type="text" name="firstname" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>Last Name</label>
                        <input type="text" name="lastname" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <div>
                            <label>Male</label>
                            <input type="radio" name="gender" value="male" onChange = {e => this.setState({[e.target.name]:[e.target.value]})}/>
                            <label>Female</label>
                            <input type="radio" name="gender" value="female" onChange = {e => this.setState({[e.target.name]:[e.target.value]})}/>
                        </div>
                        <label>Email</label>
                        <input type="email" name="email" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>Mobile</label>
                        <input type="number" name="mobile" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>Address1</label>
                        <input type="text" name="address1" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>Address2</label>
                        <input type="text" name="address2" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>City</label>
                        <input type="text" name="city" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        <label>Pincode</label>
                        <input type="text" name="pincode" onChange = {e => this.setState({[e.target.name]:[e.target.value]})} required/>
                        {
                            localStorage.getItem("user_role") === "center"?
                                <input type="submit" className="submit" value="Submit"/>
                            :<input type="submit" className="submit" value="Submit" disabled="true" className="disable"/>
                        }
                    </form>
                </div>
                <div>
                    <table border="1">
                        <thead>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>Center</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {
                                this.state.studentList.map(row => (
                                    <tr key = {row.id}>
                                        <td>{row.firstname}</td>
                                        <td>{row.lastname}</td>
                                        <td>{row.gender}</td>
                                        <td>{row.email}</td>
                                        <td>{row.mobile}</td>
                                        <td>{row.address}</td>
                                        <td>{row.city}</td>
                                        <td>{row.pincode}</td>
                                        <td>{row.center}</td>
                                        {
                                          localStorage.getItem("user_role") === 'center'?
                                            <td>
                                                <button onClick = {e => this.deleteStudent(row.id)}>Delete</button>
                                            </td>  
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
export default Student;