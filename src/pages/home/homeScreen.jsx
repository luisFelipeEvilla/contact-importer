import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import axios from "axios";
import { format } from 'fecha';
import Spinner from "../../components/spinner/spinner";

import './homeScreen.css'
import userLogo from '../../assets/user.png';
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [pagesCount, setPagesCount] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const contactsPerPgae = 9

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin')
        } else {
            getPagesCount();
        }
    }, [token])

    useEffect(() => {
        if (!token) {
            navigate('/signin')
        } else {
            getContacts();
        }
    }, [actualPage])

    function getPagesCount() {
        axios.get('http://localhost:4000/contacts/count', {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setPagesCount(Math.ceil(response.data / contactsPerPgae));
                    setActualPage(1)
                }
            })
    }

    function getContacts() {
        axios.get('http://localhost:4000/contacts', {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            },
            params: {
                limit: contactsPerPgae,
                offset: actualPage * contactsPerPgae
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setContacts(response.data)
                    setLoading(false);
                }
            })
    }

    return (
        <div className="container contacts-container">
            {
                loading ? <Spinner></Spinner> :
                    <div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 card-container">
                            {
                                contacts.map(contact =>
                                    <div key={contact.contact_id} className="col">
                                        <div className="card shadow-sm">
                                            <img src={userLogo} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{contact.name}</h5>
<<<<<<< HEAD
                                                <p className="card-subtitle mb-2 text-muted"><b>Phone:</b> {contact.phone}</p>
                                                <p className="card-subtitle mb-2 text-muted"><b>Email:</b> {contact.email}</p>
                                                <p className="card-subtitle mb-2 text-muted"><b>Address:</b> {contact.address}</p>
                                                <p className="card-subtitle mb-2 text-muted"><b>Credit CardNetowkr:</b> {contact.credit_card_network}</p>
                                                <p className="card-subtitle mb-2 text-muted"><b>Credit Card Number:</b> {contact.credit_card}</p>
                                                <p className="card-subtitle mb-2 text-muted"><b>Birth Date:</b> {format(new Date(contact.birth_date), 'YYYY MMMM DD')}</p>
=======
                                                <p className="card-subtitle mb-2 text-muted">Birth Date: {contact.birth_date}</p>
                                                <p className="card-subtitle mb-2 text-muted">Phone: {contact.phone}</p>
                                                <p className="card-subtitle mb-2 text-muted">Address: {contact.address}</p>
                                                <p className="card-subtitle mb-2 text-muted">Credit Card Network: {contact.credit_card_network}</p>
                                                <p className="card-subtitle mb-2 text-muted">Credit Card Number: {contact.credit_card}</p>
                                                <p className="card-subtitle mb-2 text-muted">Email: {contact.email}</p>
>>>>>>> 268488cc08338643d095edf357955dd8aea47f7a
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <div className='pagination-container'>
                            <ReactPaginate
                                className='pagination'
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                activeClassName='page-item active'
                                nextClassName='page-item'
                                previousClassName='page-item'
                                nextLinkClassName='page-link'
                                previousLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                breakLabel="..."
                                nextLabel="Siguiente"
                                onPageChange={e => setActualPage(e.selected)}
                                pageRangeDisplayed={5}
                                pageCount={pagesCount}
                                previousLabel="Anterior"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export default HomeScreen;