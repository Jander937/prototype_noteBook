import React from 'react';
import Button from 'react-bootstrap/Button';

const DeleteNoteBookButton = ({ id, onDeletionSuccess }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Call the onDeletionSuccess function passed as a prop
            onDeletionSuccess(id);
        } catch (error) {
            console.error('Error al eliminar el noteBook:', error);
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            Eliminar
        </Button>
    );
};

export default DeleteNoteBookButton;
