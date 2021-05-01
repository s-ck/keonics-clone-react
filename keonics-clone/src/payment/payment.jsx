import React from 'react';
import axios from 'axios';
import Select from 'react-select';

import './payment.css';
import BASE_URL from '../appconst';

class Payment extends React.Component{
    constructor(){
        super();
        this.state = {
            centers:[],
            payments:[],
            amount:'',
            startdate:'',
            enddate:'',
            center:''
        }      
    }

    componentDidMount(){
        axios({
            'method':'get',
            'url':BASE_URL+'/centers',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            let centers = []
            res.data.map(row => {
                centers.push({"value":row.id,"label":row.centername})
            })
            this.setState({centers:centers})
        }).catch(error =>{
            alert(error.message);
        })

        axios({
            method:'get',
            url:BASE_URL+'/payments',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({payments:res.data})
        })
        
    }

    handleSelect = (center) => {
        this.setState({center:center.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.center)
        axios({
            method:'post',
            url:BASE_URL+'/addPayments',
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            },
            data:{
                "payment":this.state.amount[0],
                "startdate":this.state.startdate[0],
                "enddate":this.state.enddate[0],
                "center":{
                    "id":this.state.center
                }
            }
        }).then(res => {
            if(res.status === 200){
                alert("Payments added successfully")
            }
        }).catch(error => {
            alert(error.message)
        })
    }

    render(){
        return(
            <div className="payment">
                <div className="payment__form">
                    <form onSubmit = {this.handleSubmit}>
                    <h1>Payment</h1>
                        <label>Center</label>
                        <Select onChange = {this.handleSelect} options = {this.state.centers}></Select>
                        <label>Amount</label>
                        <input type="number" required onChange = {e => this.setState({amount:[e.target.value]})}/>
                        <label>Start Date</label>
                        <input type="date" required onChange = {e => this.setState({startdate:[e.target.value]})}/>
                        <label>End Date</label>
                        <input type="date" required onChange = {e => this.setState({enddate:[e.target.value]})}/>
                        {
                            localStorage.getItem("user_role") !== "center"?
                                <input type="submit" className="submit" value="submit"/>
                            :<input type="submit" className="submit" value="submit" disabled="true" className="disable"/>
                        }
                        
                    </form>
                </div>
                <table border="1">
                    <thead>
                        <th>Center</th>
                        <th>Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </thead>
                    <tbody>
                        {
                            this.state.payments.map(row => (
                            <tr>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        )
    }
}
export default Payment;