import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

import './login.styles.css';

function Login() {
    const history = useHistory(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const singIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push("/");
        })
        .catch(error => alert(error.message));
    }

    const createAccount = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {
            history.push("/");
        })
        .catch(error => alert(error.message));
    }

    return (
        <div className="login">
          <Link to="/">
            <img 
                className="login__logo"
                src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png"
                alt=""
            />
          </Link>
          <div className="login__container">
            <h1>Sing-in</h1>
            <form>
                <h5>Email</h5>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button  type="submit" className="login__singin" onClick={singIn}>Sing in</button>  
            </form>
            <p>
                By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
            </p>
                <button className="login__createaccount" onClick={createAccount}>Create an Account</button>
          </div> 
        </div>
    )
}
export default Login;
