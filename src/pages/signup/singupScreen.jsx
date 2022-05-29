import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

import './signupScreen.css'

function SignupScreen(props) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    const handleSignUp = async () => {
        const username = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        await axios.post('http://localhost:4000/signup', {
            "username": username,
            "password": password
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((result) => {
            if (result.status === 201) {
                console.log(result.data);
                localStorage.setItem('token', JSON.stringify(result.data.token))
                setToken(result.data.token)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container login-container">
            <div className="form-container">
                <h2 className="row form-title">Registrarse</h2>
                <div className="row">
                    <div className="form-group">
                        <label for="name" className="form-label">Nombre Completo</label>
                        <input className="form-control" id="name" type="text" placeholder="Ingresa tu nombre"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label for="password" className="form-label">Contraseña</label>
                        <input className="form-control" id="password" type="password"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="submit-container">
                        <button className="btn btn-success" onClick={handleSignUp} type="submit">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen;