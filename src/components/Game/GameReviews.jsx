import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getGameReviewsMinusDays } from "../../redux/actions";
import { Button, Col, Row } from "react-bootstrap";
import { HandThumbsUp, Star, StarFill, StarHalf } from "react-bootstrap-icons";

const ReviewsMain = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.gameReviews.content.content);
  const [days, setDays] = useState();
  const navigate = useNavigate();

  const renderRatingStars = averageRating => {
    const roundedRating = Math.round(averageRating * 2) / 2;
    const stars = [];
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} className="rating-color" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="rating-color" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="rating-color" />);
    }

    return stars;
  };

  const convertCreatedAt = createdAt => {
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleDateString();
    return `${formattedDate}`;
  };

  const handleHelpfulClick = e => {
    e.preventDefault();
  };

  useEffect(() => {
    setDays(31);
    if (days) {
      dispatch(getGameReviewsMinusDays(gameId, days, 5, "likes"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, days]);

  return (
    <>
      {reviews && (
        <Row>
          <Col xs={12} lg={8}>
            <h5 className="text-white">
              MOST HELPFUL REVIEWS <span style={{ color: "#56707F" }}>IN THE PAST {days} DAYS</span>
            </h5>
            {reviews.map(review => (
              <div
                key={review.id}
                className="px-2"
                style={{ backgroundColor: "#16202D", borderTop: "1px solid #3A6E8A" }}
              >
                <Row key={review.id} className="mb-3 text-white py-2">
                  <Col xs={12} lg={4} className="mb-2">
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
                      <div className="fs-7 text-truncate">{review.user.username}</div>
                    </div>
                  </Col>
                  <Col xs={12} lg={8}>
                    <div className="d-flex mb-2">
                      <div className="me-2 fs-7">USER RATING:</div>
                      <div className="d-flex my-auto">{renderRatingStars(review.rating)}</div>
                    </div>
                    <div className="text-secondary fs-8 mb-2">POSTED: {convertCreatedAt(review.createdAt)}</div>
                    <div className="fs-5 mb-2">{review.title}</div>
                    <div className="fs-6 text-light border-bottom border-secondary pb-2 mb-2">{review.content}</div>
                    <div className="fs-7 mb-2 text-secondary">Was this review helpful?</div>
                    <div>
                      <Button className="like-btn border-0 rounded-0" onClick={() => handleHelpfulClick(review.id)}>
                        <HandThumbsUp className="me-1" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col xs={12} lg={4}></Col>
        </Row>
      )}
    </>
  );
};

export default ReviewsMain;
