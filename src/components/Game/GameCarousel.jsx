import React, { useEffect, useState } from "react";
import { Carousel, Row, Col, Badge, Button, Modal } from "react-bootstrap";
import {
  Android2,
  Apple,
  NintendoSwitch,
  Playstation,
  Star,
  StarFill,
  StarHalf,
  Steam,
  Xbox,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveFromLibrary, getUserSavedGames } from "../../redux/actions";
import ReviewForm from "./ReviewForm";

const GameCarousel = ({ images, game }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const token = useSelector(state => state.auth.token);
  const userSavedGames = useSelector(state => state.userSavedGames.content.content);
  const user = useSelector(state => state.currentUser.content);
  const dispatch = useDispatch();
  const isGameInLibrary = userSavedGames?.some(savedGame => savedGame.id === game.id);
  const [shouldDeleteReview, setShouldDeleteReview] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  const convertDate = date => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString();
    return `${formattedDate}`;
  };

  const renderRatingStars = averageRating => {
    const roundedRating = Math.round(averageRating * 2) / 2;
    const stars = [];
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    if (roundedRating === 0.0) {
      return <div>No reviews yet</div>;
    }

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

  const getPlatformIcon = platform => {
    switch (platform) {
      case "PC":
        return <Steam />;
      case "PLAYSTATION":
        return <Playstation />;
      case "XBOX":
        return <Xbox />;
      case "NINTENDO":
        return <NintendoSwitch />;
      case "IOS":
        return <Apple />;
      case "ANDROID":
        return <Android2 />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setIsVideoPlaying(true);
  }, [activeIndex]);

  useEffect(() => {
    dispatch(getUserSavedGames(10000000, token, 0, user.id));
  }, [dispatch, token, user.id]);

  const handleSaveGame = async gameId => {
    if (isGameInLibrary) {
      await dispatch(addRemoveFromLibrary(gameId, token));
      await setShouldDeleteReview(true);
      await dispatch(getUserSavedGames(10000000, token, 0, user.id));
    } else {
      await dispatch(addRemoveFromLibrary(gameId, token));
      await setShouldDeleteReview(false);
      await dispatch(getUserSavedGames(10000000, token, 0, user.id));
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmSaveGame = () => {
    handleSaveGame(game.id);
    handleCloseModal();
  };

  const handleToggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  return (
    <>
      <div className="mt-5 mb-4 text-white">
        <h2 className="mb-4 text-truncate">{game.title}</h2>

        <div className="p-0 my-box-shadow" style={{ backgroundColor: "#0E1821", border: "1px solid #1E2831" }}>
          <Row className="mb-2">
            <Col lg={7} xl={8} className="mb-4 mb-lg-0">
              <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                className="mb-1 custom-carousel "
                interval={5000}
              >
                {images.map((item, index) => (
                  <Carousel.Item key={index}>
                    {index === 0 ? (
                      <video
                        src={item}
                        width="100%"
                        controls
                        autoPlay={isVideoPlaying}
                        muted
                        onPause={() => setIsVideoPlaying(false)}
                        onPlay={() => setIsVideoPlaying(true)}
                      />
                    ) : (
                      <img src={item} alt={`Slide ${index + 1}`} className="w-100 object-fit-cover d-block" />
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="d-flex justify-content-start thumbnail-container p-1">
                {images.map((item, index) => (
                  <div key={index}>
                    {index === 0 ? (
                      <video
                        src={item}
                        width={220}
                        className={`d-flex m-0 me-1 ${activeIndex === index ? "selected" : ""}`}
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                      />
                    ) : (
                      <img
                        key={index}
                        src={item}
                        width={220}
                        alt={`Thumbnail ${index + 1}`}
                        className={`h-100 object-fit-cover me-1 ${activeIndex === index ? "selected" : ""}`}
                        onClick={() => setActiveIndex(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={5} xl={4} className="d-flex" style={{ fontSize: "0.8rem" }}>
              <Row className="flex-column flex-md-row flex-lg-column">
                <Col xs={12} md={6} lg={12} className="mb-3">
                  <img src={game.gameCover} alt="game-cover" width={"100%"} />
                </Col>
                <Col className="d-flex flex-column">
                  <Col className="mb-2">
                    <div className="line-clamp mx-3 mx-lg-0 fs-7 me-lg-2">{game.description}</div>
                  </Col>
                  <Col className="mb-2">
                    <Row>
                      <Col>
                        <div className="text-secondary mx-3 mx-lg-0">RATING:</div>
                      </Col>
                      <Col>
                        {" "}
                        <div className="mx-3 mx-lg-0 me-lg-2">{renderRatingStars(game.averageRating)}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="mb-2">
                    <Row>
                      <Col>
                        <div className="text-secondary mx-3 mx-lg-0">RELEASE DATE:</div>
                      </Col>
                      <Col>
                        <div className="mx-3 mx-lg-0 me-lg-2">{convertDate(game.releaseDate)}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="mb-2">
                    <Row>
                      <Col>
                        <div className="text-secondary mx-3 mx-lg-0">DEVELOPER:</div>
                      </Col>
                      <Col>
                        <div className="mx-3 mx-lg-0 me-lg-2">{game.developer}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="mb-2">
                    <Row>
                      <Col>
                        <div className="text-secondary mx-3 mx-lg-0">PUBLISHER:</div>
                      </Col>
                      <Col>
                        <div className="mx-3 mx-lg-0 me-lg-2">{game.publisher}</div>
                      </Col>
                    </Row>
                  </Col>
                  <div className="mx-3 mx-lg-0 mb-2 mb-lg-0">
                    <div className="text-secondary ">Game genres:</div>
                    {game.genres.map((genre, index) => (
                      <Badge key={index} bg="secondary" className="rounded-0 p-1 me-1 mb-1 ">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Col className="d-flex justify-content-end mt-auto">
                    <div className="d-flex mx-3 mx-lg-0 me-lg-2">
                      {game.platforms.map((platform, index) => (
                        <div key={index} className="d-flex my-auto ms-2 fs-5">
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div className="rounded-2" style={{ backgroundColor: "#515F6E" }}>
        <Row className="text-white align-items-middle mb-4 p-3 ">
          <Col className="m-auto">
            <h5 className="m-0">{isGameInLibrary ? "In your Library" : "Add to Library to write a review"}</h5>
          </Col>
          <Col className="text-end m-auto">
            <Button
              style={{ minWidth: "127px" }}
              className="rounded-1 py-1 text-center"
              variant={isGameInLibrary ? "danger" : "success"}
              onClick={handleToggleConfirmationModal}
            >
              {isGameInLibrary ? "Remove" : "Add to Library"}
            </Button>
          </Col>
        </Row>
      </div>
      {isGameInLibrary && <ReviewForm gameId={game.id} shouldDeleteReview={shouldDeleteReview} />}
      <Modal show={showConfirmationModal} className="text-white" onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isGameInLibrary
            ? "Are you sure you want to remove this game from your library? This action will delete the review you have posted if you have one!"
            : "Add this game to your library?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant={isGameInLibrary ? "danger" : "success"} onClick={handleConfirmSaveGame}>
            {isGameInLibrary ? "Remove" : "Add to Library"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameCarousel;
