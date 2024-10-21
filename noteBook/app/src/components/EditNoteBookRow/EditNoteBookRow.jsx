import React, { useState } from 'react';

const EditNoteBookRow = ({ noteBook, onSave, onCancel }) => {
    const [editnoteBook, setEditnoteBook] = useState({ ...noteBook });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditnoteBook((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editnoteBook);
    };

    return (
        <tr id='jander'>
            <td>
                <input
                    type="text"
                    name="img"
                    value={editnoteBook.img}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="firstName"
                    value={editnoteBook.firstName}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="surname"
                    value={editnoteBook.surname}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="email"
                    value={editnoteBook.email}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onCancel}>Cancelar</button>
            </td>
        </tr>
    );
};

export default EditNoteBookRow;
