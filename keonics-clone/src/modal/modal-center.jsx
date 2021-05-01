import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

import './modal-center.css';
import BASE_URL from '../appconst';

const Modal = ({users}) => {
    const[name,setName] = useState('');
    const[mobile,setMobile] = useState('');
    const[city,setCity] = useState('');
    const[user,setUser] = useState('');

    const getUserid = (e) =>{
        axios({
            method:'post',
            url:BASE_URL+"/getUser",
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "email":e.label,
                "status":"active"
            }
            }).then(res => {
                setUser(res.data);
            }).catch(error => {
                alert(error.message);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        axios({
            method:'post',
            url:BASE_URL+'/addCenter',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                'centername':name,
                'mobile':mobile,
                'city':city,
                'status':'new',
                'user':{
                    "creationDate":user.creationDate,
                    "email":user.email,
                    "id":user.id
                }
            }
        }).then(res => {
            alert("Center added successfully "+res.data.centername);
        }).catch(error => {
            alert(error.message);
        })
    }

    return(
        <div className="modal">
            <form onSubmit = {handleSubmit}>
                <label className = "label">Center Name</label>
                <input type="text" name="name" value={name} required
                       onChange = {e => setName(e.target.value)}/>
                <label className = "label">Mobile</label>
                <input type="number" name="mobile" value={mobile} required
                       onChange = {e => setMobile(e.target.value)}/>
                <label className = "label">City</label>
                <input type="text" name="city" value={city} required
                       onChange = {e => setCity(e.target.value)}/>
                <label className = "label">User</label>
                <Select onChange = {getUserid} options = {users}></Select>
                <input type="submit" className="submit__button" value="Submit"/>
            </form>
            <button id="modal__close">Close</button>
        </div>
    )
}
export default Modal;