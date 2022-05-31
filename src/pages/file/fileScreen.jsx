import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

import './fileScreen.css'
import Spinner from "../../components/spinner/spinner";

function FileScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [actualPage, setActualPage] = useState(0);
    const [success, setSutcces] = useState(0);

    const { id } = useParams();

    const filesPerPage = 10;

    useEffect(() => {
        getPagesCount();
    }, [token])

    useEffect(() => {
        getFile();
    }, [pagesCount, actualPage])

    function getPagesCount() {
        axios.get(`http://localhost:4000/file/count/${id}?created=false`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setPagesCount(Math.ceil(response.data / filesPerPage));
                }
            })

        axios.get(`http://localhost:4000/file/count/${id}?created=true`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setSutcces(response.data);
                }
            })
    }

    function getFile() {
        console.log(actualPage);
        axios.get(`http://localhost:4000/files/${id}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            },
            params: {
                limit: filesPerPage,
                offset: actualPage * filesPerPage
            }
        }).then(response => {
            if (response.status === 200) {
                setFiles(response.data)
                setLoading(false);
            }
        }).catch(err => {
            alert(err)
        })
    }
    return (
        loading ? <Spinner /> :
            <div className="file-container">
                <div>
                    <h3>Success: {success}</h3>
                    <h3>Fails: {files.length}</h3>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <th>
                                #
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>
                            <th>
                                Valid Name?
                            </th>
                            <th>
                                Valid Birth Date?
                            </th>
                            <th>
                                Valid Phone?
                            </th>
                            <th>
                                Valid Address?
                            </th>
                            <th>
                                Valid Credit Card?
                            </th>
                            <th>
                                Valid Email?
                            </th>
                        </thead>
                        <tbody>
                            {
                                files.map((contact, index) => {
                                    return (
                                        <tr>
                                            <td>{index + filesPerPage * actualPage}</td>
                                            <td>{contact.name}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.valid_name ? 'yes' : 'no'}</td>
                                            <td>{contact.valid_birth_date ? 'yes' : 'no'}</td>
                                            <td>{contact.valid_phone ? 'yes' : 'no'}</td>
                                            <td>{contact.valid_address ? 'yes' : 'no'}</td>
                                            <td>{contact.valid_credit_card ? 'yes' : 'no'}</td>
                                            <td>{contact.valid_email ? 'yes' : 'no'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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
    )
}

export default FileScreen;