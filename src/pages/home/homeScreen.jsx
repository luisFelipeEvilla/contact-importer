import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import axios from "axios";
import Spinner from "../../components/spinner/spinner";
import { format } from 'fecha';

import './homeScreen.css'
import userLogo from '../../assets/user.png';

function HomeScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [pagesCount, setPagesCount] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const contactsPerPgae = 9

    useEffect(() => {
        getPagesCount();
    }, [token])

    useEffect(() => {
        getContacts();
    }, [pagesCount, actualPage])

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
                offset: (actualPage - 1) * contactsPerPgae
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
        <div className="container centers-container">
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
                                                <p className="card-subtitle mb-2 text-muted">Birth Date: {format(new Date(contact.birth_date), 'YYYY MMMM DD')}</p>
                                                <p className="card-subtitle mb-2 text-muted">Phone: {contact.phone}</p>
                                                <p className="card-subtitle mb-2 text-muted">Address: {contact.address}</p>
                                                <p className="card-subtitle mb-2 text-muted">Credit Card: {contact.credit_card}</p>
                                                <p className="card-subtitle mb-2 text-muted">Email: {contact.email}</p>
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