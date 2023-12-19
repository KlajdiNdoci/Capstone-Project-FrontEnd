import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addComment, getNewsDetails } from "../../redux/actions";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const { newsId } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (content.length >= 3) {
        await dispatch(addComment(token, newsId, content));
        await dispatch(getNewsDetails(token, newsId));
      }
    }
    setValidated(true);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 text-white mb-4"
      style={{ backgroundColor: "#223248" }}
      noValidate
      validated={validated}
    >
      <h5 className="mb-3 fs-6">ADD COMMENT</h5>
      <Form.Group className="mb-5">
        <Form.Control
          required
          className="border-secondary text-white"
          style={{ backgroundColor: "#1B2838", boxShadow: "none" }}
          as="textarea"
          rows={5}
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback className="position-absolute" type="invalid">
          The content must have at least 3 characters!
        </Form.Control.Feedback>
      </Form.Group>
      <Button style={{ minWidth: "78px" }} type="submit" className="py-1 rounded-1">
        Publish
      </Button>
    </Form>
  );
};

export default CommentForm;
