import React from 'react';
import axios from 'axios';

import './center.css';
import BASE_URL from '../appconst';
import Modal from '../modal/modal-center';

class Center extends React.Component{

    constructor(){
        super();
        this.state = {
            centers:[],
            user:[],
            display:'none'
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
                this.setState({centers:res.data})
            }).catch(error =>{
                alert(error.message);
            })
        }
        else{
            axios({
                'method':'get',
                'url':BASE_URL+'/centers',
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                let centers = []
                res.data.map(row =>{
                    centers.push({"id":row[0],"centername":row[1],"city":row[2],
                                  "mobile":row[3],"status":row[4],"user":row[5]})
                })
                this.setState({centers:centers})
            }).catch(error =>{
                alert(error.message);
            })
        }
        axios({
            method:'get',
            url:BASE_URL+"/getCenteruser",
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            let user = [] 
            res.data.map(row => {
                user.push({value:row[0], label:row[1]});
            })
            this.setState({user:user});
        }).catch(error => {
            alert(error.message);
        });
    }

    displayModal = () =>{
        this.setState({display:"block"})
    }

    modalClose = () => {
        this.setState({display:"block"});
    }

    deletCenter = id => {
        axios({
            method:'delete',
            url:BASE_URL+`/deleteCenter/`+id,
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
        }).then(res => {
            alert("Center deleted successfully "+res.data.id);
            this.componentDidMount();
        }).catch(error => {
            alert("Students are associated");
        })
    }

    approveCenter = row => {
        console.log(row)
        axios({
            method:'post',
            url:BASE_URL+'/addCenter',
            headers :{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "id":row.id,
                "centername":row.centername,
                "mobile":row.mobile,
                "city":row.city,
                "status":'approved',
                "user":{
                    "id":row.user
                }
            }
        }).then(res => {
            alert("Center updated successfully "+res.data.id);
            this.componentDidMount();
        }).catch(error => {
            alert(error.message);
        })
    }

    render(){
        return(
            <div className = "center__container">
                {
                    localStorage.getItem("user_role") === 'keonics' |
                    localStorage.getItem("user_role") === 'admin'?
                        <button onClick={this.displayModal}>Add Center</button>
                    :<span></span>
                }
                <div onClick={this.modalClose}>
                    <div style={{display:this.state.display}}>
                        <Modal users = {this.state.user}/>
                    </div>
                </div>
            <div className="center">
                <h1>Center</h1>
                <table border="1">
                  <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.centers.map(row => (
                            <tr key = {row.id}>
                                <td>{row.id}</td>
                                <td>{row.centername}</td>
                                <td>{row.mobile}</td>
                                <td>{row.city}</td>
                                <td>{row.status}</td>
                                {
                                    localStorage.getItem("user_role") === 'keonics' |
                                    localStorage.getItem("user_role") === 'admin'?
                                    row.status==='approved'?
                                        <td><button className="btn-center-delete" onClick={() => this.deletCenter(row.id)}>Delete</button></td>
                                        :<td><button className="btn-center-approve" onClick={() => this.approveCenter(row)}>Approve</button></td>
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
export default Center;