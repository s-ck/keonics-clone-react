import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import BASE_URL from '../appconst';
import './login.css';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email_login : '',
            password_login : '',
        }
    }
    
    login = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: BASE_URL+"/token",
            data: {
              "userName": this.state.email_login,
              "password": this.state.password_login
            }
        }).then(res => {
            if(res.status === 200){
                localStorage.setItem("token",res.data.token);
            }
            if(localStorage.getItem("token") !== null){
                this.props.history.push("/home");
            }
        })
        .catch(error => alert("Email or Password is invalid"));

        axios({
            method:'post',
            url:BASE_URL+"/getUser",
            data:{
                "email":this.state.email_login,
                "roles":{
                    "role":"keonics",
                    "id":"1"
                }
            }
        }).then(res => {
            localStorage.setItem("user_role", res.data.roles.roles);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("user_id",res.data.id);
        }).catch(error => {
            alert(error.message);
        })
        this.setState({email_login:''})
        this.setState({password_login:''})
    }

    handleLoginChange = (e) => {

        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.name]:e.target.value});

    }

    render(){
        return(
            <div className="container">
                <div className = "login">
                    <div>
                    <form onSubmit = {this.login}>
                    <h1>Login</h1>
                        <label className = "lable">Email</label>
                        <input type="email" name="email_login" className="input" 
                            value = {this.state.email_login} onChange = {this.handleLoginChange}/>
                        <label className = "lable">Password</label>
                        <input type="password" name="password_login" className="input" 
                            value = {this.state.password_login} onChange = {this.handleLoginChange}/>
                        <input type="submit" className="login-btn" value="submit"/>
                    </form>
                </div>
                </div>      
            </div>
            )
        }
}
export default withRouter(Login);