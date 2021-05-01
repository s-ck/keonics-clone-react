import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import './batch.css';
import BASE_URL from '../appconst';

class Batch extends React.Component{
    constructor(){
        super();
        this.state = {
            batchname:'',
            startdate:'',
            enddate:'',
            courselist:'',
            studentList:[],
            selectedstudent:[],
            course:null
        }
    }

    componentDidMount(){
        if(localStorage.getItem("user_role") === "center"){
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

    handleSubmit = (e) => {
        e.preventDefault()
        let temp = []
        this.state.selectedstudent.map(student => {
            temp.push({"id":student.value})
        })
        axios({
            method:'post',
            url:BASE_URL+'/addBatch',
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "batch_name":this.state.batchname[0],
                "start_date":this.state.startdate[0],
                "end_date":this.state.enddate[0],
                "course":{
                    "id":this.state.course
                },
                "center":{
                    "id":localStorage.getItem("center_id")
                },
                "students":temp
            }
        }).then(res => {
            if(res.status === 200){
                alert("Batch added successfully")
            }
        }).catch(error => {
            alert(error.message);
        });
    }

    handleSelect = (e) =>{
        let data = (Array.isArray(e)?e.map(student => student):[])
        console.log(data)
        this.setState({selectedstudent:data})
    }

    handleSingleselect = (course) =>{
        this.setState({course:course.value})
    }

    render(){
        return(
            <div className="batch">
                <Link to = "/batchlist">
                    <button>Batch List</button>
                </Link>
                <div className="batch__form">
                <form onSubmit = {this.handleSubmit}>
                    <h1>Create Batch</h1>
                    <label>Batch Name</label>
                    <input type="text" name="batchname" onChange = {e => this.setState({[e.target.name]:[e.target.value]})}/>
                    <label>Start Date</label>
                    <input type="date" name="startdate" onChange = {e => this.setState({[e.target.name]:[e.target.value]})}/>
                    <label>End Date</label>
                    <input type="date" name="enddate" onChange = {e => this.setState({[e.target.name]:[e.target.value]})}/>
                    <label>Course</label>
                    <Select onChange = {this.handleSingleselect} options={this.state.courselist}></Select>
                    <label>Student</label>
                    <Select isMulti onChange = {this.handleSelect} options = {this.state.studentList} ></Select>
                    {
                        localStorage.getItem("user_role") === "center"?
                            <input type="submit" value="submit" className = "submit"/>
                        :<input type="submit" value="submit" disabled = "true" className = "disable"/>
                    }
                    
                </form>
                </div>
            </div>
        )
    }
}
export default Batch;