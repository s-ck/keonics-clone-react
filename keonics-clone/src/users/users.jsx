import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BASE_URL from '../appconst';

import './users.css';

function Users() {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(localStorage.getItem("user_role") != 'center'){
            axios({
                method:'get',
                url:BASE_URL+"/getAllusers",
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                setUsers(res.data);
            }).catch(error => {
                alert(error.message);
            });
        }else{
            axios({
                method:'post',
                url:BASE_URL+"/getUser",
                headers :{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                },
                data:{
                    email:localStorage.getItem("email"),
                    "status":"active"
                }
            }).then(res => {
                setUser(res.data);
            }).catch(error => {
                alert(error.message);
            });
        }
    }, [])

    return (
        <div className = "users">
         {
            localStorage.getItem("user_role") === 'keonics' ||
            localStorage.getItem("user_role") === 'admin'? 
            <table border="1">
                <thead>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Creation Date</th>
                </thead>
                <tbody>
                    {
                       users.map(row => (
                        <tr key = {row.id}>
                            <td>{row.email}</td>
                            <td>{row.roles.roles}</td>
                            <td>{row.status}</td>
                            <td>{row.creationDate}</td>
                        </tr>
                       )) 
                    }
                </tbody>
            </table>
            :
            <table border="1">
                <thead>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Creation Date</th>
                </thead>
                <tbody>
                    {
                        user?
                        <tr>
                            <td>{user.email}</td>
                            <td>{user.roles.roles}</td>
                            <td>{user.status}</td>
                            <td>{user.creationDate}</td>
                        </tr>
                        :<tr></tr> 
                    }
                </tbody>
            </table>
         }
        </div>
    )
}
export default Users
