import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom"
import axios from "axios";

import './signin.css'

function SigninScreen(props) {
    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/')
            window.location.reload()
        }
    }, [token])

    const handleSignin = async () => {
        const username = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        await axios.post('http://localhost:4000/signin', {
            "username": username,
            "password": password
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((result) => {
            if (result.status === 200) {
                localStorage.setItem('token', JSON.stringify(result.data.token))
                setToken(result.data.token)
            }
        }).catch(error => {
            alert(error.response.data.error);
        })
    }

    return (
        <div className="container signin-container">
            <div className="form-container">
                <h2 className="row form-title">Ingresar</h2>
                <div className="row">
                    <div className="form-group">
                        <label for="name" className="form-label">Nombre</label>
                        <input className="form-control" id="name" type="text" placeholder="Ingresa tu nombre"></input>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label for="password" className="form-label">Contraseña</label>
                        <input className="form-control" id="password" type="password"></input>
                    </div>
                </div>

                <div className="submit-container">
                    <button className="btn btn-success" type="submit" onClick={handleSignin}>Enviar</button>
                    <div className="signup-link-container">
                        <Link to="/signup">¿Áun no tienes una cuenta?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninScreen