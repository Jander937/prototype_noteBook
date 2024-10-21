import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateNoteBook = ({ onnoteBookCreated }) => {
    const [show, setShow] = useState(false);
    const [newnoteBook, setNewnoteBook] = useState({
        img: '',
        firstName: '',
        publication_year: '',
        email: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewnoteBook({ ...newnoteBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newnoteBook),
            });

            if (response.ok) {
                onnoteBookCreated();
                handleClose();
                setNewnoteBook({
                    img: '',
                    firstName: '',
                    surname: '',
                    email: ''
                });
            } else {
                console.error('Error al crear el noteBook:', await response.text());
            }
        } catch (error) {
            console.error('Error al crear el noteBook:', error);
        }
    };

    return (
        <>
            <Button id="crear" variant="primary" onClick={handleShow}>
                Add New noteBook
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new noteBook</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>first Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                required
                                value={newnoteBook.firstName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                required
                                value={newnoteBook.surname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                required
                                value={newnoteBook.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="img"
                                value={newnoteBook.img}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateNoteBook;
