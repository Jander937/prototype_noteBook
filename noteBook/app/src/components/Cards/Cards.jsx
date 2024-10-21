import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteNoteBookButton from '../CreateNoteBook/CreateNoteBook'; // Make sure this path is correct
import EditNoteBookRow from "../EditNoteBookRow/EditNoteBookRow"; // Make sure this path is correct // Adjust the path according to your file structure
import CreateNoteBook from '../CreateNoteBook/CreateNoteBook';
import SearchNoteBook from '../SearchNoteBook/SearchNoteBook';


function NoteBookCard() { 
    const [noteBookData, setnoteBookData] = useState([]);
    const [editingnoteBook, setEditingnoteBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdatenoteBook = async (noteBook) => {
        try {
            const response = await fetch(`http://localhost:8080/api/${noteBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteBook),
            });

            if (response.ok) {
                console.log('noteBook actualizado con éxito');
                setnoteBookData(noteBookData.map(b => b.id === noteBook.id ? noteBook : b));
                setEditingnoteBook(null); // Exit editing mode
            } else {
                console.error('Error al actualizar el noteBook:', await response.text());
            }
        } catch (error) {
            console.error('Error al actualizar el noteBook:', error);
        }
    };

    const cancelEdit = () => {
        setEditingnoteBook(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/search`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setnoteBookData(data);
        } catch (error) {
            console.error('Error al obtener los noteBooks:', error);
        }
    };
    const handlenoteBookCreated = () => {
        fetchData(); // Fetch the updated noteBook list after a new noteBook is created
    };

    const onDeletionSuccess = (id) => {
        setnoteBookData(noteBookData.filter(noteBook => noteBook.id !== id));
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    const filterednoteBooks = searchTerm
    ? noteBookData.filter(noteBook =>
        noteBook.img.toLowerCase().includes(searchTerm) ||
        noteBook.firstName.toLowerCase().includes(searchTerm) ||
        noteBook.email.toLowerCase().includes(searchTerm) ||
        noteBook.surname.toString().toLowerCase().includes(searchTerm)
      )
    : noteBookData;


    return (
    
        <div id="lucho">
        <CreateNoteBook onNoteBookCreated={handlenoteBookCreated} />
        <SearchNoteBook onSearch={handleSearch} />
        {filterednoteBooks.map((noteBook) => {
            if (editingnoteBook && noteBook.id === editingnoteBook.id) {
                return (
                    <EditNoteBookRow
                        key={noteBook.id}
                        noteBook={editingnoteBook}
                        onSave={handleUpdatenoteBook}
                        onCancel={cancelEdit}
                    />
                );
            } else {
                return (
                    <Card key={noteBook.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={noteBook.img} />
                        <Card.Body>
                            <Card.Title>{noteBook.firstName}</Card.Title>
                            <Card.Text>
                                Surname: {noteBook.surname}
                            </Card.Text>
                            <Card.Text>
                                Email: {noteBook.email}
                            </Card.Text>
                            <Button variant="primary" onClick={() => setEditingnoteBook(noteBook)}>Edit</Button>
                            <DeleteNoteBookButton id={noteBook.id} onDeletionSuccess={onDeletionSuccess} />
                        </Card.Body>
                    </Card>
                );
            }
        })}
    </div>
        
    );
}

export default NoteBookCard;
