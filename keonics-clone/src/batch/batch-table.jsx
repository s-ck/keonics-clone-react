import React from 'react';
import axios from 'axios';

import './batch-table.css';
import BASE_URL from '../appconst';

class BatchList extends React.Component{
    constructor(){
        super()
        this.state = {
            batchlist:[]
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:BASE_URL+"/getBatchs",
            headers:{
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then(res => {
            let batch = []
            res.data.map(row => {
                batch.push({"batchname":row[0],"startdate":row[1],
                "enddate":row[2],"course":row[3],"student":row[4],"center":row[5]})
            })
            this.setState({batchlist:batch})   
        }).catch(error => {
            alert(error.message)
        })
    }

    handleDelete = (id) => {
        if(window.confirm("This batch will be delete permently")){
            axios({
                method:'delete',
                url:BASE_URL+"/deleteBatch/"+id,
                headers:{
                    'Authorization': "Bearer "+localStorage.getItem("token")
                }
            }).then(res => {
                alert("Batch deleted successfully")
            }).catch(error => {
                alert(error.message)
            })
        }
        this.componentDidMount()
    }

    render(){
        return(
            <div className="table">
                <table border="1">
                    <thead>
                        <th>Batch Name</th>
                        <th>Student Name</th>
                        <th>Course Name</th>
                        <th>Center</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            this.state.batchlist.map(row => (
                                <tr key = {row.id}>
                                    <td>{row.batchname}</td>
                                    <td>{row.student}</td>
                                    <td>{row.course}</td>
                                    <td>{row.center}</td>
                                    <td>{row.startdate}</td>
                                    <td>{row.enddate}</td>
                                    {
                                        localStorage.getItem("user_role") === 'center'?
                                        <td>
                                            <button onClick = {e => this.handleDelete(row.id)}>Delete</button>
                                        </td>
                                        :<td></td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}
export default BatchList;