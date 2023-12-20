// EditProfileModal.js

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditProfileModal = ({ show, handleClose, handleSave, user }) => {
  const [validated, setValidated] = useState(false);
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

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await handleSave(editedUser);
      await handleClose();
    }
    setValidated(true);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user.name,
      username: user.username,
      surname: user.surname,
      email: user.email,
    });
    // Chiudi il modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel} className="text-white">
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body>
          <Form.Group className="mb-5" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              minLength="3"
              maxLength="30"
              className="text-white bg-dark"
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback className="position-absolute" type="invalid">
              The username must be between 3 and 30 characters!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              minLength="3"
              maxLength="30"
              className="text-white bg-dark"
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback className="position-absolute" type="invalid">
              The name must be between 3 and 30 characters!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5" controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              required
              minLength="3"
              maxLength="30"
              className="text-white bg-dark"
              type="text"
              name="surname"
              value={editedUser.surname}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback className="position-absolute" type="invalid">
              The surname must be between 3 and 30 characters!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-5" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              minLength="3"
              maxLength="30"
              className="text-white bg-dark"
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback className="position-absolute" type="invalid">
              Inser a valid email!
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
