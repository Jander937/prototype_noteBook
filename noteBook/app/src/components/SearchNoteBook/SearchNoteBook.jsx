import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchNoteBook = ({ onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value); // Pass the search term back to the parent component
    };

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Buscar noteBooks..."
                    onChange={handleSearch}
                />
            </Form.Group>
        </Form>
    );
};

export default SearchNoteBook;
