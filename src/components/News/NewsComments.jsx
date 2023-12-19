// NewsComments.jsx

import { Row, Col, Button } from "react-bootstrap";
import { HandThumbsUpFill, Pencil } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsDetails, likeComment } from "../../redux/actions";
import CommentForm from "./CommentForm";

const NewsComments = ({ token, comments }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newsId } = useParams();
  const currentUser = useSelector(state => state.currentUser.content);

  const convertCreatedAt = createdAt => {
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleDateString();
    return `${formattedDate}`;
  };

  const handleLike = async commentId => {
    await dispatch(likeComment(commentId, token));
    await dispatch(getNewsDetails(token, newsId));
  };

  return (
    <Row>
      <Col>
        <h6 className="p-1" style={{ backgroundColor: "#223248" }}>
          Comments
        </h6>
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
                              <Button variant="success" className="d-flex p-1 fs-7 rounded-1">
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
                    <div className="fs-6 text-light border-bottom border-secondary pb-2 mb-2">{comment.content}</div>
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
