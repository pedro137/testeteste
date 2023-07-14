import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditIndex(-1);
    setTitle('');
    setAuthor('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = { title, author };
      setBooks(updatedBooks);
    } else {
      const newBook = { title, author };
      setBooks([...books, newBook]);
    }
    setTitle('');
    setAuthor('');
    handleModalClose();
  };

  const handleEdit = (index) => {
    const bookToEdit = books[index];
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setEditIndex(index);
    handleModalOpen();
  };

  const handleDelete = (index) => {
    setSelectedBook(books[index]);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedBooks = [...books];
    updatedBooks.splice(editIndex, 1);
    setBooks(updatedBooks);
    setSelectedBook(null);
    setEditIndex(-1);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setSelectedBook(null);
    setShowDeleteModal(false);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const BookDetailsModal = ({ book, show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Título:</strong> {book.title}
          </p>
          <p>
            <strong>Autor:</strong> {book.author}
          </p>
        </Modal.Body>
      </Modal>
    );
  };

  const DeleteConfirmationModal = ({ show, handleConfirm, handleCancel }) => {
    return (
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Deseja realmente excluir este livro?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="container">
      <div className="button-container">
        <Button variant="primary" onClick={handleModalOpen}>
          Adicionar Livro
        </Button>
      </div>

      <div className="table-container">
        <Table striped bordered>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ver</th>
              <th>Editar</th>
              <th>Excluir</th>
              
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Button variant="info" onClick={() => handleViewDetails(book)}>
                    Ver
                  </Button>
                </td>
                <td>
                  <Button variant="link" onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          show={showDetailsModal}
          handleClose={() => setShowDetailsModal(false)}
        />
      )}

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== -1 ? 'Editar Livro' : 'Adicionar Livro'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAuthor">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editIndex !== -1 ? 'Salvar' : 'Adicionar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;
