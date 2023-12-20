// EditAvatarModal.js

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditAvatarModal = ({ show, handleClose, handleSaveAvatar }) => {
  const [formData, setFormData] = useState(new FormData());
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = e => {
    if (e.target && e.target.files[0]) {
      formData.append("avatar", e.target.files[0]);

      setFormData(formData);

      const selectedFile = e.target.files[0];

      const reader = new FileReader();

      reader.onload = event => {
        setFilePreview(event.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSaveChanges = async () => {
    if (formData) {
      await handleSaveAvatar(formData);
      await setFormData(new FormData());
      await setFilePreview("");
      await handleClose();
    }
  };

  const handleImageSubmit = async e => {
    e.preventDefault();
  };

  return (
    <Modal show={show} onHide={handleClose} className="text-white large-modal">
      <Modal.Header closeButton>
        <Modal.Title>Upload image</Modal.Title>
      </Modal.Header>
      <Form className="pt-4" onSubmit={handleImageSubmit}>
        <Modal.Body style={{ minHeight: "400px" }}>
          <div className="pb-4">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select an image to upload</Form.Label>
              <Form.Control type="file" onChange={e => handleFileChange(e)} />

              {filePreview && (
                <div className="text-center m-3 border rounded-3">
                  <img src={filePreview} alt="preview" className="p-3 custom-preview-image" />
                </div>
              )}
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAvatarModal;
