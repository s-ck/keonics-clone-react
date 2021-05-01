import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';

function Home() {
       return (
        <div className = "home">
           <nav className="nav-bar">
                <ul>
                    <li>
                        {
                            localStorage.getItem("user_role") === "center"?
                                <Link>
                                    Home
                                </Link>
                            :<Link to="/">
                                Home
                            </Link>
                        }
                    </li>
                    <li>
                        {
                            localStorage.getItem("user_role") !== 'center'?
                            <Link to = "/register">
                                Register
                            </Link>
                            :<Link >
                                Register
                            </Link>
                        }
                    </li>
                    <li>
                        <Link to = "/centers">
                            Centers
                        </Link>
                    </li>
                    <li>
                        <Link to = "/users">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to = "/course">
                            Course
                        </Link>
                    </li>
                    <li>
                        <Link to = "/enquiry">
                            Enquiry
                        </Link>
                    </li>
                    <li>
                        <Link to = "/batch">
                            Batch
                        </Link>
                    </li>
                    <li>
                        <Link to = "/students">
                            Students
                        </Link>
                    </li>
                    <li>
                        <Link to = "/payments">
                            Payments
                        </Link>
                    </li>
                    <li>
                        <Link to = "/certifications">
                            Certifications
                        </Link>
                    </li>
                    <li>
                        <Link to = "/login" onClick={e => localStorage.clear()}
                            className="logout">
                            {localStorage.getItem("email")}  Logout
                        </Link>
                    </li>
                </ul>
           </nav>
        </div>
    )
}
export default Home;
