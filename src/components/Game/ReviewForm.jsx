import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import { addReview, getGameReviewsMinusDays, getRecentReviews } from "../../redux/actions";
import { Star, StarFill } from "react-bootstrap-icons";

const ReviewForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState();
  const [validated, setValidated] = useState(false);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Form.Label key={i} className={`cursor-pointer star-label ${rating >= i ? "filled" : ""}`}>
          <Form.Check
            required
            type="radio"
            name="rating"
            className="d-none"
            value={i}
            checked={rating === i}
            onChange={() => {
              setRating(i);
            }}
          />
          {rating >= i ? <StarFill className="cursor-pointer rating-color" /> : <Star className="rating-color" />}
        </Form.Label>
      );
    }
    return stars;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(addReview(token, gameId, title, content, rating));
      dispatch(getRecentReviews(gameId, 5, token));
    }

    setValidated(true);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 text-white rounded-2 mb-4"
      style={{ backgroundColor: "#203042" }}
      noValidate
      validated={validated}
    >
      <h5 className="mb-5">ADD A REVIEW</h5>
      <Form.Group className="mb-5">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          style={{ backgroundColor: "#1B2838", boxShadow: "none" }}
          className="border-secondary text-white"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback className="position-absolute" type="invalid">
          The title must be between 3 and 30 characters!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>Content</Form.Label>
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
      <Form.Group className="mb-5">
        <Form.Label className="mb-0">Rating</Form.Label>
        <div className="stars-container fs-5">{renderStars()}</div>
        {validated && !rating ? (
          <div className="text-danger position-absolute" style={{ fontSize: "0.9rem" }}>
            Please select a rating!
          </div>
        ) : (
          validated && (
            <div className="text-success position-absolute" style={{ fontSize: "0.9rem" }}>
              Looks good!
            </div>
          )
        )}
      </Form.Group>
      <Button type="submit" className="py-1 rounded-1">
        Publish
      </Button>
    </Form>
  );
};

export default ReviewForm;
