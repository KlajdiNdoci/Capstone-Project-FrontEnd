import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { HandThumbsUpFill, Pencil } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getNewsDetails, likeComment, updateComment } from "../../redux/actions";
import CommentForm from "./CommentForm";

const NewsComments = ({ token, comments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsId } = useParams();
  const currentUser = useSelector(state => state.currentUser.content);

  const [editedComment, setEditedComment] = useState("");
  const [editModes, setEditModes] = useState({});

  const convertCreatedAt = createdAt => {
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleDateString();
    return `${formattedDate}`;
  };

  const handleLike = async commentId => {
    await dispatch(likeComment(commentId, token));
    await dispatch(getNewsDetails(token, newsId));
  };

  const handleUpdateComment = async (commentId, content) => {
    await dispatch(updateComment(token, commentId, content));
    await dispatch(getNewsDetails(token, newsId));
    setEditModes(prevEditModes => ({ ...prevEditModes, [commentId]: false }));
    setEditedComment("");
  };
  const handleDeleteComment = async commentId => {
    await dispatch(deleteComment(token, commentId));
    await dispatch(getNewsDetails(token, newsId));
  };

  const handleToggleEditMode = commentId => {
    setEditModes(prevEditModes => ({
      ...prevEditModes,
      [commentId]: !prevEditModes[commentId],
    }));

    if (!editModes[commentId]) {
      setEditedComment(comments.find(comment => comment.id === commentId)?.content || "");
    }
  };

  return (
    <Row>
      <Col>
        <h5 className="p-3 py-2" style={{ backgroundColor: "#223248" }}>
          COMMENTS
        </h5>
        <CommentForm />
        {comments && comments.length > 0 ? (
          <>
            {comments.map(comment => (
              <div key={comment.id} className="px-2" style={{ backgroundColor: "#223248" }}>
                <Row className="mb-3 text-white py-2">
                  <Col xs={12} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <div className=" d-flex review-user align-items-center mb-2">
                        <div
                          onClick={() => {
                            navigate("/profile/" + comment.user.id);
                          }}
                          className="me-2"
                        >
                          <img
                            src={comment.user.avatar}
                            className="object-fit-cover"
                            style={{ border: "solid 2px #4D95B1" }}
                            width={34}
                            height={34}
                            alt="avatar"
                          />
                        </div>
                        <div className="fs-7 text-truncate">{comment.user.username}</div>
                      </div>
                      <div>
                        {currentUser.id === comment.user.id ? (
                          <div className="d-flex justify-content-end order-md-3">
                            <div>
                              <Button
                                variant="success"
                                className="d-flex p-1 fs-7 rounded-1"
                                onClick={() => handleToggleEditMode(comment.id)}
                              >
                                <Pencil />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="text-secondary fs-8 mb-2 ms-auto">
                      POSTED: {convertCreatedAt(comment.createdAt)}
                    </div>
                  </Col>
                  <Col xs={12}>
                    {editModes[comment.id] ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={editedComment}
                        className="my-2 text-white"
                        onChange={e => setEditedComment(e.target.value)}
                        style={{ backgroundColor: "#1B2838" }}
                      />
                    ) : (
                      <div className="fs-6 text-light border-bottom border-secondary pb-2 mb-2">{comment.content}</div>
                    )}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Button
                          className={`like-btn border-0 rounded-1 me-2 ${
                            comment.likes.some(user => user.id === currentUser.id) ? "liked" : ""
                          }`}
                          onClick={() => handleLike(comment.id)}
                        >
                          <HandThumbsUpFill />
                        </Button>
                        <div>{comment.likes.length}</div>
                      </div>
                      {editModes[comment.id] && (
                        <div>
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => handleUpdateComment(comment.id, editedComment)}
                          >
                            Save
                          </Button>
                          <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        ) : (
          <p>No comments yet.</p>
        )}
      </Col>
    </Row>
  );
};

export default NewsComments;
