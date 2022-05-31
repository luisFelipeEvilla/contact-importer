import React, { useState } from "react";
import axios from "axios";

import ContactsTable from "../../components/contactTable/contactsTable";
import Spinner from "../../components/spinner/spinner";
import './uploadScreen.css';

function UploadScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [fails, setFails] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const file = document.getElementById('contacts').files[0];

        if (file) {
            const data = new FormData()
            data.append('contacts', file)

            setLoading(true)
            axios.post('http://localhost:4000/contacts', data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token.slice(1, -1)}`
                }
            }).then(async response => {
                if (response.status === 200) {
                    const filtrered = await response.data.filter(result => result.created === false)
                    setFails(filtrered);
                    setLoading(false);
                } 
            }).catch(error => {
                setLoading(false);
                alert(error.response.data.error);
            })
        } else {
            alert('should select a file')
        }
    }
    return (
        loading ? <Spinner /> :
            <div className="upload-container">
                <div className="form-container">
                    <h2 className="row form-title">Upload Contacts</h2>
                    <div className="row">
                        <div className="form-group">
                            <label for="contacts" className="form-label">Contacts file</label>
                            <input className="form-control" id="contacts" type="file" ></input>
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="btn btn-success" type="submit" onClick={e => handleSubmit(e)}>Enviar</button>
                    </div>
                </div>

                <div className="table-container">
                    {
                        fails.length > 0 ? <ContactsTable contacts={fails}></ContactsTable> : <div></div>
                    }
                </div>

            </div>
    )
}

export default UploadScreen;