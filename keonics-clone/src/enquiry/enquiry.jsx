import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

import BASE_URL from '../appconst';
import './enquiry.css';

class Enquiry extends React.Component{
    constructor(){
        super();
        this.state = {
            enquiries:[],
            courselist:[],
            addenquiry:"none",
            alertpopup:false,
            deletePopup:false,
            firstname:'',
            email:'',
            mobile:'',
            course:[]
        }
    }
    componentDidMount(){
        if(localStorage.getItem("user_role") === 'keonics' ||
            localStorage.getItem("user_role") === 'admin'){
            axios({
                method:'get',
                url:BASE_URL+"/enquiryList",
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                let Enqdata = []
                res.data.map(data => {
                    Enqdata.push({"id":data[0],"firstname":data[1],"email":data[2],
                    "mobile":data[3],"course":data[4],"center":data[5]});
                })
                this.setState({enquiries:Enqdata});
            }).catch(error => {
                alert(error.message);
            })
        }
        else{
            axios({
                method:'get',
                url:BASE_URL+"/center/enquiryList/"+localStorage.getItem("user_id"),
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                let Enqdata = []
                res.data.map(data => {
                    Enqdata.push({"id":data[0],"firstname":data[1],"email":data[2],
                    "mobile":data[3],"course":data[4],"center":data[5]});
                })
                this.setState({enquiries:Enqdata});
            }).catch(error => {
                alert(error.message);
            })
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
               
    }

    showForm = () =>{
        if(this.state.addenquiry === "none"){
            this.setState({addenquiry:"block"});
        }
        else{
            this.setState({addenquiry:"none"});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let course = []
        this.state.course.map(row =>{
            course.push({"id":row.value, "course":row.label})
        })

        axios({
            method:'post',
            url:BASE_URL+"/addEnquiry",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "firstname":this.state.firstname[0],
                "email":this.state.email[0],
                "mobile":this.state.mobile[0],
                "center":{
                    "id":localStorage.getItem("user_id")
                },
                "course":course
            }
        }).then(res => {
            if(res.status === 200 && res.data.length !== 0){
                this.setState({alertpopup:true});
            }else if(res.status === 200 && res.data.length === 0){
                this.setState({alertpopup:false});
                alert("This center is not approved");
            }
        }).catch(error => {
            console.log(error.status);
            alert(error.message);
        })
        this.componentDidMount();
    }

    handleSelect = (e) =>{
        let data = (Array.isArray(e)?e.map(course => course):[])
        this.setState({course:data})
    }

    deleteEnq = (id) => {
        if(window.confirm("The courses associated will be deleted")){
            axios({
                method:'delete',
                url:BASE_URL+"/deleteEnquiry/"+id,
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                if(res.status === 200){
                    this.setState({deletePopup:true})
                    this.componentDidMount();
                }
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    render(){
        return(
            <div className="enquiry">
                {
                    localStorage.getItem("user_role") === "center"?
                    <button onClick = {this.showForm}>Add Enquiry</button>
                    :<span></span>
                }
                {
                  this.state.alertpopup === true?
                    <Alert severity="success">Enquiry Added Successfully</Alert>
                  :<span></span>
                }
                {
                  this.state.deletePopup === true?
                    <Alert severity="success">Enquiry Deleted Successfully</Alert>
                  :<span></span>
                }
                <div className="enquiry__form" style={{display:this.state.addenquiry}}>
                    <h1>Add Enquiry</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Firstname</label>
                        <input type="text" name="firstname" 
                            onChange={e => this.setState({[e.target.name]:[e.target.value]})}/>
                        <label>Email</label>
                        <input type="email" name="email"
                            onChange={e => this.setState({[e.target.name]:[e.target.value]})}/>
                        <label>Mobile</label>
                        <input type="number" name="mobile"
                            onChange={e => this.setState({[e.target.name]:[e.target.value]})}/>
                        <label>Course</label>
                        <Select isMulti onChange={this.handleSelect} options={this.state.courselist}></Select>
                        <input type="submit" className="submit__btn" value="submit"/>
                    </form>
                </div>
                <table border="1">
                    <thead>
                        <th>FirstName</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Courses</th>
                        <th>Center</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            this.state.enquiries.map(row =>(
                                <tr key = {row.id}>
                                    <td>{row.firstname}</td>
                                    <td>{row.email}</td>
                                    <td>{row.mobile}</td>
                                    <td>{row.course}</td>
                                    <td>{row.center}</td>
                                    {
                                        localStorage.getItem("user_role") === "center"?
                                        <td><button className = "enqBtn__delete" onClick={e => this.deleteEnq(row.id)}>Delete</button></td>
                                        :<td></td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Enquiry;