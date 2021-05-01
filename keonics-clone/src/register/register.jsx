import React from 'react';
import axios from 'axios';

import './register-center.css';
import BASE_URL from '../appconst';

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            email_reg : '',
            password_reg1 : '',
            password_confirm : '',
            email_reg_keonics : '',
            password_reg1_keonics : '',
            password_confirm_keonics : ''
        }
    }

    handleLoginChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        this.setState({[e.target.name]:e.target.value});
    }

    registerCenter = (e) => {
        e.preventDefault();
        if(this.state.password_reg1 === this.state.password_confirm){
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            let day = new Date().getDay();

            let date = year+'-'+month+'-'+day;
            
            axios({
                method: 'post',
                url: BASE_URL+"/register",
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                },
                data: {
                    "email": this.state.email_reg,
                    "password":this.state.password_reg1,
                    "status":"active",
                    "creationDate":date,
                    "roles":{
                        "id":"2",
                        "role":"center"
                    }
                }
            }).then(res => {alert("User register successfully "+res.data.email)})
            .catch(error => {alert(error.message)});
        }
        else
        {
            alert("Password did not matching");
        }
    }

    registerKeonics = (e) => {
        e.preventDefault();
        if(this.state.password_reg1_keonics === this.state.password_confirm_keonics){
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            let day = new Date().getDay();

            let date = year+'-'+month+'-'+day;
            
            axios({
                method: 'post',
                url: BASE_URL+"/register",
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                },
                data: {
                    "email": this.state.email_reg_keonics,
                    "password":this.state.password_confirm_keonics,
                    "status":"active",
                    "creationDate":date,
                    "roles":{
                        "id":"1",
                        "role":"keonics"
                    }
                }
            }).then(res => {alert("User register successfully "+res.data.email)})
            .catch(error => {alert(error.message)});
        }
        else
        {
            alert("Password did not matching");
        }
    }

    render(){
        return(
            <div className="register__forms">
                <div className="register__center">
                    <div className="form__reg">
                        <h1>Register Center</h1>
                        <form onSubmit = {this.registerCenter}>
                            <label className = "lable">Email</label>
                            <input type="email" name="email_reg" required
                                value = {this.state.email_reg} onChange = {this.handleLoginChange}/>
                            <label className = "lable">Password</label>
                            <input type="password" name="password_reg1" required
                                value = {this.state.password_reg1} onChange = {this.handleLoginChange}/>
                            <label className = "lable">Confirm Password</label>
                            <input type="password" name="password_confirm" required
                                value = {this.state.password_confirm} onChange = {this.handleLoginChange}/>
                            <input type="submit" className="reg-btn" value="Register"/>
                        </form>
                    </div>
                {
                    localStorage.getItem("user_role") !== "keonics"?
                    <div className="register">
                    <div>
                        <form onSubmit = {this.registerKeonics}>
                        <h1>Register Keonics</h1>
                            <label className = "lable">Email</label>
                            <input type="email" name="email_reg_keonics" className="input" required 
                                value = {this.state.email_reg_keonics} onChange = {this.handleLoginChange}/>
                            <label className = "lable">Password</label>
                            <input type="password" name="password_reg1_keonics" className="input" required
                                value = {this.state.password_reg1_keonics} onChange = {this.handleLoginChange}/>
                            <label className = "lable">Confirm Password</label>
                            <input type="password" name="password_confirm_keonics" className="input" required
                                value = {this.state.password_confirm_keonics} onChange = {this.handleLoginChange}/>
                            <input type="submit" className="reg-btn" value="Register"/>
                        </form>
                    </div>
                    </div>
                    :<div></div>
                }
            </div>
            </div>
        )
    }
}
export default Register;