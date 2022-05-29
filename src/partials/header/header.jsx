import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './header.css'

import logo from '../../assets/logo/logo.svg';

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {   
        localStorage.removeItem('token');
        navigate('/signin')
        window.location.reload();
    }
    return (
        <nav id="header" className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className='brand-logo' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list navbar-toggler-icon"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {token ? <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/config">Config</Link>
                        </li> : <div></div>}
                        {
                            !token ? <li className="nav-item">
                                <Link className="nav-link" to="/signin" tabIndex="-1" aria-disabled="true">Login</Link>
                            </li> : <li className="nav-item" onClick={handleLogout}>
                                <Link className="nav-link" to="#" tabIndex="-1" aria-disabled="true">Logout</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header