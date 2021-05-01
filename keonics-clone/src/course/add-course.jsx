import React from 'react';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

import BASE_URL from '../appconst';
import './add-course.css';

class AddCourse extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            alert:false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.name !== ''){
            axios({
                method:'post',
                url:BASE_URL+"/addCourse",
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                },
                data:{
                    "course":this.state.name[0],
                }
            }).then(res => {
                if(res.status == 200){
                    this.setState({alert:true});
                }
            }).catch(error => {
                alert(error.message);
            });
            this.setState({name:''});
        }
    }

    render(){
        return(
            <div className = "addCourse">
                {
                    this.state.alert===true?
                    <Alert severity="success">Course Added successfully</Alert>
                    :<span></span>
                }
                <form onSubmit = {this.handleSubmit} onLoad = {e => this.setState({alert:false})}>
                    <lable>Course Name</lable>
                    <input type="text" name="name" onChange={e => this.setState({[e.target.name]:[e.target.value]})}/>
                    <input type="submit" className="btn-submit" value="submit"/>
                </form>
            </div>
        )
    }
}
export default AddCourse;
