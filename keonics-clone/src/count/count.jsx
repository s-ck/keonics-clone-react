import axios from 'axios';
import React from 'react';

import './count.css';
import BASE_URL from '../appconst';

class Count extends React.Component{
    constructor(){
        super();
        this.state = {
            center:0,
            enquiry:0,
            batch:0,
            payment:0,
            student:0,
            certification:0
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:BASE_URL+"/getCentercount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({center:res.data});
        }).catch(error => {
            alert(error.message);
        })
        
        axios({
            method:'get',
            url:BASE_URL+"/getEnquirycount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({enquiry:res.data});
        }).catch(error => {
            alert(error.message);
        })

        axios({
            method:'get',
            url:BASE_URL+"/getBatchcount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({batch:res.data});
        }).catch(error => {
            alert(error.message);
        })

        axios({
            method:'get',
            url:BASE_URL+"/getPaymentscount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({payment:res.data});
        }).catch(error => {
            alert(error.message);
        })

        axios({
            method:'get',
            url:BASE_URL+"/getStudentscount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({student:res.data});
        }).catch(error => {
            alert(error.message);
        })

        axios({
            method:'get',
            url:BASE_URL+"/getCertificationcount",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({certification:res.data});
        }).catch(error => {
            alert(error.message);
        })
    }

    render(){
        return(
            <div>
            <div className="count">
                <div className="div__count1" id="count1">
                    <span>Center</span>
                    <span>{this.state.center}</span>
                </div>
                <div className="div__count2" id="count2">
                    <span>Enquiry</span>
                    <span>{this.state.enquiry}</span>
                </div>
                <div className="div__count3" id="count3">
                    <span>Batch</span>
                    <span>{this.state.batch}</span>
                </div>
            </div>
            <div className="count">
                <div className="div__count4" id="count4">
                    <span>Payment</span>
                    <span>{this.state.payment}</span>
                </div>
                <div className="div__count5" id="count5">
                    <span>Student</span>
                    <span>{this.state.student}</span>
                </div>
                <div className="div__count6" id="count6">
                    <span>Certification</span>
                    <span>{this.state.certification}</span>
                </div>
            </div>
            </div>
        )
    }
}
export default Count;