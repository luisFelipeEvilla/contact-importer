import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import './configScreen.css';

function ConfigScreen() {
    const [ token, setToken ] = useState(localStorage.getItem('token'))
    const [ loading, setLoading ] = useState(false);
    const [ finish, setFinish ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (finish) {
            navigate('/')
        }
    }, [finish])

    const handleClick = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const birth_date = document.getElementById('birth_date').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const credit_card = document.getElementById('credit_card').value;
        const email = document.getElementById('email').value;

        if (name && birth_date && phone && address && credit_card && email) {

            axios.post('http://localhost:4000/contacts/config', {
                name,
                birth_date,
                phone,
                address,
                credit_card,
                email
            },{
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token.slice(1,-1)}`
                }
            }).then(response => {
                if (response.status === 200) {
                    console.log(response);
                    setFinish(true);
                } else {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                }
            }).catch(response => {
                alert(response.error)
            }) 
        } else {
            alert("should complete all the form")
        }
    }
    return (
        <div className="container config-container">
            <div className="form-container">
                <h2 className="row form-title">Almacenar configuración</h2>
                <div className="row">
                    <div className="form-group">
                        <label for="name" className="form-label">Name</label>
                        <input className="form-control" id="name" type="text"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label for="birth_date" className="form-label">Birth_date</label>
                        <input className="form-control" id="birth_date" type="text"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label for="phone" className="form-label">Phone</label>
                        <input className="form-control" id="phone" type="text"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label for="address" className="form-label">Address</label>
                        <input className="form-control" id="address" type="text"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label for="credit_card" className="form-label">Credit_card</label>
                        <input className="form-control" id="credit_card" type="text"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label for="email" className="form-label">Email</label>
                        <input className="form-control" id="email" type="text"></input>
                    </div>
                </div>
                <div className="submit-container">
                    <button className="btn btn-success" type="submit" onClick={event => handleClick(event)}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default ConfigScreen;