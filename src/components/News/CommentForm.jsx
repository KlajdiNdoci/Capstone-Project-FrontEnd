import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addReview, deleteReview, getRecentReviews, getUserReviews, updateReview } from "../../redux/actions";

const CommentForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.currentUser.content);
  const userReviews = useSelector(state => state.userReviews.content.content);
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const [currentUserComment, setCurrentUserComment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (isEditMode && currentUserComment) {
        console.log("ciao");
        await dispatch(updateReview(token, currentUserComment.id, content));
        setIsEditMode(false);
      } else {
        await dispatch(addReview(token, gameId, content));
        await dispatch(getUserReviews(user.id, 10000000, token));
      }
      await dispatch(getRecentReviews(gameId, 5, token));
    }

    setValidated(true);
  };

  const handleDelete = async e => {
    e.preventDefault();
    await dispatch(deleteReview(token, currentUserComment.id));
    await dispatch(getUserReviews(user.id, 10000000, token));
    await dispatch(getRecentReviews(gameId, 5, token));
    setValidated(false);
  };

  useEffect(() => {
    dispatch(getUserReviews(user.id, 10000000, token));
  }, [gameId, dispatch, token, user.id]);

  useEffect(() => {
    setCurrentUserComment(userReviews?.find(review => review.user.id === user.id && review.game.id === gameId));

    if (currentUserComment) {
      setContent(currentUserComment.content);
    } else {
      setContent("");
    }
  }, [currentUserComment, gameId, user.id, userReviews]);

  useEffect(() => {
    if (currentUserComment) {
      const deleteReviewAsync = async () => {
        await dispatch(deleteReview(token, currentUserComment.id));
        await dispatch(getUserReviews(user.id, 10000000, token));
        await dispatch(getRecentReviews(gameId, 5, token));
      };

      deleteReviewAsync();
    }
  }, [currentUserComment, gameId, dispatch, token, user.id]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 text-white rounded-2 mb-4"
      style={{ backgroundColor: "#203042" }}
      noValidate
      validated={validated}
    >
      <h5 className="mb-5">{isEditMode ? "EDIT YOUR REVIEW" : !currentUserComment ? "ADD A REVIEW" : "YOUR REVIEW"}</h5>
      <Form.Group className="mb-5">
        <Form.Label>Content</Form.Label>
        <Form.Control
          required
          className={`border-secondary text-white ${!isEditMode && currentUserComment ? "opacity-50" : ""}`}
          style={{ backgroundColor: "#1B2838", boxShadow: "none" }}
          as="textarea"
          rows={5}
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={!isEditMode && currentUserComment}
        />
        <Form.Control.Feedback className="position-absolute">Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback className="position-absolute" type="invalid">
          The content must have at least 3 characters!
        </Form.Control.Feedback>
      </Form.Group>
      {!currentUserComment && (
        <Button style={{ minWidth: "78px" }} type="submit" className="py-1 rounded-1">
          Publish
        </Button>
      )}

      {isEditMode && currentUserComment && (
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

      {!isEditMode && currentUserComment && (
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

export default CommentForm;
