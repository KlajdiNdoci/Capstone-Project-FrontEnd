// EditProfileModal.js

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditProfileModal = ({ show, handleClose, handleSave, user }) => {
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    username: user.username,
    surname: user.surname,
    email: user.email,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    handleSave(editedUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="text-white">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="text-white bg-dark"
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="text-white bg-dark"
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              className="text-white bg-dark"
              type="text"
              name="surname"
              value={editedUser.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="text-white bg-dark"
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
