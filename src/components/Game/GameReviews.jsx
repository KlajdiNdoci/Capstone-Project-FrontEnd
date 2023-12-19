import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGameReviewsMinusDays, getRecentReviews, likeReview } from "../../redux/actions";
import { Button, Col, Row } from "react-bootstrap";
import { HandThumbsUpFill, Star, StarFill, StarHalf } from "react-bootstrap-icons";

const GameReviews = ({ game }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.gameReviews.content.content);
  const isLoadingReviews = useSelector(state => state.gameReviews.content.isLoading);
  const recentReviews = useSelector(state => state.recentReviews.content.content);
  const isLoadingRecentReviews = useSelector(state => state.recentReviews.content.isLoading);
  const currentUser = useSelector(state => state.currentUser.content);
  const [days, setDays] = useState();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const [page, setPage] = useState(1);

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
  const handleLike = async reviewId => {
    await dispatch(likeReview(reviewId, token));
    await dispatch(getRecentReviews(game.id, page * 5, token));
    await dispatch(getGameReviewsMinusDays(game.id, days, page * 5, "likes", "asc", token));
  };

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (bottom) {
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  useEffect(() => {
    setDays(31);
    dispatch(getRecentReviews(game.id, page * 5, token));
    if (days) {
      dispatch(getGameReviewsMinusDays(game.id, days, page * 5, "likes", "asc", token));
    }
  }, [game.id, days, dispatch, token, page]);

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
                <Row className="mb-3 text-white py-2">
                  <Col xs={12} lg={4} className="mb-2">
                    <div className=" d-flex review-user align-items-center">
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
                    <div className="d-flex align-items-center">
                      <Button
                        className={`like-btn border-0 rounded-1 me-2 ${
                          review.likes.some(user => user.id === currentUser.id) ? "liked" : ""
                        }`}
                        onClick={() => handleLike(review.id)}
                      >
                        <HandThumbsUpFill />
                      </Button>
                      <div>{review.likes.length}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col xs={12} lg={4}>
            <h5 className="text-white">RECENTLY POSTED</h5>
            {recentReviews.map(review => (
              <div key={review.id} style={{ backgroundColor: "#203042", borderTop: "1px solid #3A6E8A" }}>
                <div key={review.id} className="mb-3 text-white">
                  <div className="d-flex p-2 text-truncate" style={{ backgroundColor: "#141E2A" }}>
                    <Col
                      className="fs-7 text-truncate me-2 review-user"
                      onClick={() => {
                        navigate("/profile/" + review.user.id);
                      }}
                    >
                      {review.user.username}
                    </Col>

                    <Col className="d-flex my-auto">{renderRatingStars(review.rating)}</Col>
                  </div>
                  <div className="px-2">
                    <div className="text-secondary fs-8 my-1">POSTED: {convertCreatedAt(review.createdAt)}</div>
                    <div className="fs-5 mb-2">{review.title}</div>
                    <div className="fs-6 text-light pb-2 mb-2" style={{ borderBottom: "1px solid #141E2A" }}>
                      {review.content}
                    </div>
                    <div className="fs-7 mb-2 text-secondary">Helpful?</div>
                    <div className="d-flex align-items-center pb-2">
                      <Button
                        className={`like-btn border-0 rounded-1 me-2 ${
                          review.likes.some(user => user.id === currentUser.id) ? "liked" : ""
                        }`}
                        onClick={() => handleLike(review.id)}
                      >
                        <HandThumbsUpFill />
                      </Button>
                      <div>{review.likes.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default GameReviews;
