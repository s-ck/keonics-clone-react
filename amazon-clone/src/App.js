import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/header/header.component';
import Home from './components/home/home.component';
import Checkout from './components/checkout/checkout.component';
import Login from './components/login/login.component';
import { auth } from './firebase';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStateValue } from './storeprovider';
import Payment from './components/payment-page/payment.component';
import Order from './components/orders/order.component';

const promise = loadStripe("pk_test_51IZGVJSEqhJWXFAmN0rKlHvQLBYMwFRvil7DWIZqFiVRhI9Embey7UtoQuFRtN7PtBa5IIjD58vOgsICXNEhGKEE00wAGMKlb2");

function App() {

  const [{}, dispatch] = useStateValue();
  
  console.log(useStateValue().dispatch);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){  
        dispatch({
          type:"SET_USER",
          user:authUser
        })
      }else{
		console.log(dispatch);  
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Order/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe = {promise} >
              <Payment/>
            </Elements>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
