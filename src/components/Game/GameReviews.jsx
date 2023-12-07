import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGameReviewsMinusDays } from "../../redux/actions";
import { Card, Col, Row } from "react-bootstrap";

const GameReviews = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.gameReviews.content.content);
  const [days, setDays] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setDays(31);
    if (days) {
      dispatch(getGameReviewsMinusDays(gameId, days, 10, "likes"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, days]);

  return (
    <>
      {reviews && (
        <Row>
          <Col xs={8}>
            <h5 className="text-white">
              MOST HELPFUL REVIEWS <span style={{ color: "#56707F" }}>IN THE PAST {days} DAYS</span>
            </h5>
            {reviews.map(review => (
              <Row
                key={review.id}
                className="mb-3 text-white p-2"
                style={{ backgroundColor: "#16202D", borderTop: "1px solid #3A6E8A" }}
              >
                <Col xs={4}>
                  <div className=" d-flex review-user">
                    <div
                      onClick={() => {
                        navigate("/profile/" + review.user.id);
                      }}
                      className="me-2"
                    >
                      <img
                        src={review.user.avatar}
                        className="object-fit-cover"
                        style={{ border: "solid 2px #4D95B1" }}
                        width={34}
                        height={34}
                        alt="avatar"
                      />
                    </div>
                    <div>{review.user.username}</div>
                  </div>
                </Col>
                <Col xs={8}>
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Text>{review.content}</Card.Text>
                </Col>
              </Row>
            ))}
          </Col>
          <Col xs={4}></Col>
        </Row>
      )}
    </>
  );
};

export default GameReviews;
