import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({user,userInfo})=> {
        return (
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-dark">
                <div className="container">
                    <Link className="row navbar-brand nav-link text-white" to="/" >
                        Real App
                   </Link>
                    <button
                        className="navbar-toggler text-white"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                {user && user.biz && (
                                    <NavLink className="nav-item nav-link text-white" to="/my-cards">
                                        My Cards
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/signin">
                                            Signin
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/signup">
                                            Signup
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/biz-signup">
                                            BizSignup
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <div className="d-flex align-items-center">
                                        <li className="nav-item text-primary ml-auto mr-2">{userInfo.email}{userInfo.biz ? "(biz)" : null}</li>
                                    </div>

                                    <li className="nav-item">
                                        <NavLink className="nav-link text-white" to="/logout">
                                            Logout
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    
}

export default Navbar;