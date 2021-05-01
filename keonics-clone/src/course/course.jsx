import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import BASE_URL from '../appconst';
import './course.css';

class Course extends React.Component{
    constructor(){
        super();
        this.state = {
            course:[],
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:BASE_URL+'/courseList',
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }  
        }).then(res => {
            this.setState({course:JSON.parse(JSON.stringify(res.data))});
        }).catch(error => {
            alert(error.message);
        });
    }

    deleteCourse = (row) =>{
        if(window.confirm("Are sure you want to delete this course")){
            axios({
                method:'delete',
                url:BASE_URL+'/deleteCourse/'+row[0],
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                if(res.status === 200){
                    alert("Course delete successfully "+res.data.id);
                    this.componentDidMount();
                }
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    render(){
        return(
            <div className="course">
                <Link to = "/addCourse" target = "_blank">
                    <button className = "btn-primary">Add Course</button>
                </Link>
                <h2>Courses</h2>
                <table border="1">
                    <thead>
                        <th>Id</th>
                        <th>Course Name</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            this.state.course.map(row => (
                              <tr key={row.id}>
                              {
                                row.map(data => (
                                    <td>{data}</td>
                                    
                                ))
                               } 
                               <td>
                                   <button onClick={e => this.deleteCourse(row)} className="course__delete">Delete</button>
                                </td>
                               </tr>  
                            ))
                          
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Course;