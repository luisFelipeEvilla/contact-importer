import React, { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import ReactPaginate from "react-paginate";
import en from 'javascript-time-ago/locale/en';
import { Link } from "react-router-dom";

import './filesScreen.css'
import Spinner from "../../components/spinner/spinner";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function FilesScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [actualPage, setActualPage] = useState(0);

    const filesPerPage = 10;

    useEffect(() => {
        getPagesCount();
    }, [token])

    useEffect(() => {
        getFiles();
    }, [pagesCount, actualPage])

    function getPagesCount() {
        axios.get('http://localhost:4000/files/count', {
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
    }

    function getFiles() {
        console.log(actualPage);
        axios.get('http://localhost:4000/files', {
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
            <div className="files-container">
                <div className="table-container">
                    <table>
                        <thead>
                            <th>
                                #
                            </th>

                            <th>
                                File name
                            </th>

                            <th>
                                Uploaded
                            </th>
                            <th>
                                Status
                            </th>
                            <th>

                            </th>
                        </thead>
                        <tbody>
                            {
                                files.map((file, index) => {
                                    return (
                                        <tr>
                                            <td>{index + filesPerPage * actualPage}</td>
                                            <td>{file.name}</td>
                                            <td>{timeAgo.format(new Date(file.createdat))}</td>
                                            <td>{file.status}</td>
                                            <td><Link className="btn btn-info"to={`/file/${file.file_id}`}>Detalles</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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
            </div>
    )
}

export default FilesScreen;