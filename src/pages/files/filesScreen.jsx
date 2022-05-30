import React, { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'; 

import './filesScreen.css'

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function FilesScreen() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoadig] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFiles();
    }, [token])

    function getFiles() {
        axios.get('http://localhost:4000/files', {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token.slice(1, -1)}`
            }
        }).then(response => {
            if (response.status === 200) {
                setFiles(response.data)
                console.log(response.data);
            }
        }).catch(err => {
            alert(err)
        })
    }
    return (
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
                    </thead>
                    <tbody>
                        {
                            files.map((file, index) => {
                                return (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{file.name}</td>
                                        <td>{timeAgo.format(new Date(file.createdat))}</td>
                                        <td>{file.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FilesScreen;