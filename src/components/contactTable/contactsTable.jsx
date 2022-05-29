import React from "react";

import './contactsTable.css'

function ContactsTable(props) {
    return (
        <div className="table-container">
            <h3>Fails</h3>
            <table>
                <thead>
                    <th>
                        #
                    </th>

                    <th>
                        Name
                    </th>
                    
                    <th>
                        valid name?
                    </th>
                    <th>
                        valid birth_date?
                    </th>
                    <th>
                        valid phone?
                    </th>
                    <th>
                        valid address?
                    </th>
                    <th>
                        valid credit_card?
                    </th>
                    <th>
                        valid  email?
                    </th>
                </thead>
                <tbody>
                    {
                        props.contacts.map((contact, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{contact.contact.name}</td>
                                    <td>{contact.validations.validName ? 'yes' : 'No'}</td>
                                    <td>{contact.validations.validDate ? 'yes' : 'No'}</td>
                                    <td>{contact.validations.validPhone ? 'yes' : 'No'}</td>
                                    <td>{contact.validations.validAddress ? 'yes' : 'No'}</td>
                                    <td>{contact.validations.validCreditCard ? 'yes' : 'No'}</td>
                                    <td>{contact.validations.validEmail ? 'yes' : 'No'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ContactsTable;