import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addReview, deleteReview, getRecentReviews, getUserReviews, updateReview } from "../../redux/actions";
import { Star, StarFill } from "react-bootstrap-icons";

const ReviewForm = ({ gameId, shouldDeleteReview }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.currentUser.content);
  const userReviews = useSelector(state => state.userReviews.content.content);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [validated, setValidated] = useState(false);
  const [currentUserReview, setCurrentUserReview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Form.Label
          key={i}
          className={`star-label ${rating >= i ? "filled" : ""} ${
            !isEditMode && currentUserReview ? "opacity-50 cursor-default" : "cursor-pointer"
          }`}
        >
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
            disabled={!isEditMode && currentUserReview}
          />
          {rating >= i ? <StarFill className="rating-color" /> : <Star className="rating-color" />}
        </Form.Label>
      );
    }
    return stars;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (isEditMode && currentUserReview) {
        console.log("ciao");
        await dispatch(updateReview(token, currentUserReview.id, title, content, rating));
        setIsEditMode(false);
      } else {
        await dispatch(addReview(token, gameId, title, content, rating));
        await dispatch(getUserReviews(user.id, 10000000, token));
      }
      await dispatch(getRecentReviews(gameId, 5, token));
    }

    setValidated(true);
  };

  const handleDelete = async e => {
    e.preventDefault();
    await dispatch(deleteReview(token, currentUserReview.id));
    await dispatch(getUserReviews(user.id, 10000000, token));
    await dispatch(getRecentReviews(gameId, 5, token));
    setValidated(false);
  };

  useEffect(() => {
    dispatch(getUserReviews(user.id, 10000000, token));
  }, [gameId, dispatch, token, user.id]);

  useEffect(() => {
    setCurrentUserReview(userReviews?.find(review => review.user.id === user.id && review.game.id === gameId));

    if (currentUserReview) {
      setTitle(currentUserReview.title);
      setContent(currentUserReview.content);
      setRating(currentUserReview.rating);
    } else {
      setTitle("");
      setContent("");
      setRating("");
    }
  }, [currentUserReview, gameId, user.id, userReviews]);

  useEffect(() => {
    if (shouldDeleteReview && currentUserReview) {
      const deleteReviewAsync = async () => {
        await dispatch(deleteReview(token, currentUserReview.id));
        await dispatch(getUserReviews(user.id, 10000000, token));
        await dispatch(getRecentReviews(gameId, 5, token));
      };

      deleteReviewAsync();
    }
  }, [shouldDeleteReview, currentUserReview, gameId, dispatch, token, user.id]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 text-white rounded-2 mb-4"
      style={{ backgroundColor: "#203042" }}
      noValidate
      validated={validated}
    >
      <h5 className="mb-5">{isEditMode ? "EDIT YOUR REVIEW" : !currentUserReview ? "ADD A REVIEW" : "YOUR REVIEW"}</h5>
      <Form.Group className="mb-5">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          minLength="3"
          maxLength="30"
          style={{ backgroundColor: "#1B2838", boxShadow: "none" }}
          className={`border-secondary text-white ${!isEditMode && currentUserReview ? "opacity-50" : ""}`}
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={!isEditMode && currentUserReview}
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
          minLength="3"
          maxLength="30"
          className={`border-secondary text-white ${!isEditMode && currentUserReview ? "opacity-50" : ""}`}
          style={{ backgroundColor: "#1B2838", boxShadow: "none" }}
          as="textarea"
          rows={5}
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={!isEditMode && currentUserReview}
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
          validated &&
          rating &&
          (isEditMode || !currentUserReview) && (
            <div className="text-success position-absolute" style={{ fontSize: "0.9rem" }}>
              Looks good!
            </div>
          )
        )}
      </Form.Group>
      {!currentUserReview && (
        <Button style={{ minWidth: "78px" }} type="submit" className="py-1 rounded-1">
          Publish
        </Button>
      )}

      {isEditMode && currentUserReview && (
        <div className="d-flex justify-content-between">
          <Button style={{ minWidth: "78px" }} type="submit" className="py-1 rounded-1">
            Save
          </Button>
          <Button
            style={{ minWidth: "78px" }}
            variant="danger"
            className="py-1 rounded-1"
            onClick={e => handleDelete(e)}
          >
            Delete
          </Button>
        </div>
      )}

      {!isEditMode && currentUserReview && (
        <Button
          variant="success"
          style={{ minWidth: "78px" }}
          className="py-1 rounded-1"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </Button>
      )}
    </Form>
  );
};

export default ReviewForm;
