import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from '../src/home/Home';
import Login from '../src/login/login';
import Center from './center/center';
import Users from './users/users';
import Course from './course/course';
import AddCourse from './course/add-course';
import Enquiry from './enquiry/enquiry';
import Register from './register/register';
import Batch from './batch/batch';
import Student from './student/student';
import BatchList from './batch/batch-table';
import Payment from './payment/payment';
import Certification from './certifications/certification';
import Count from './count/count';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/register">
            <Home/>
            <Register/>
          </Route>
          <Route path="/users">
            <Home/>
            <Users/>
          </Route>
          <Route path="/course">
            <Home/>
            <Course/>
          </Route>
          <Route path="/addCourse">
            <Home/>
            <AddCourse/>
          </Route>
          <Route path="/enquiry">
            <Home/>
            <Enquiry/>
          </Route>
          <Route path="/batch">
            <Home/>
            <Batch/>
          </Route>
          <Route path="/batchlist">
            <Home/>
            <BatchList/>
          </Route>
          <Route path="/students">
            <Home/>
            <Student/>
          </Route>
          <Route path="/payments">
            <Home/>
            <Payment/>
          </Route>
          <Route path="/certifications">
            <Home/>
            <Certification/>
          </Route>
          <Route path="/centers">
            <Home/>
            <Center/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home/>
            <Count/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
