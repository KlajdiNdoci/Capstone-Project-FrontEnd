import React, { useEffect, useState } from "react";
import { Carousel, Row, Col, Badge } from "react-bootstrap";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const GameCarousel = ({ images, game }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

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

  useEffect(() => {
    setIsVideoPlaying(true);
  }, [activeIndex]);

  return (
    <div className="my-5 text-white">
      <h3 className="mb-4 text-truncate">{game.title}</h3>
      <div className="p-0 my-box-shadow" style={{ backgroundColor: "#0E1821", border: "1px solid #1E2831" }}>
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
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
                      width={200}
                      className={`d-flex m-0 me-1 ${activeIndex === index ? "selected" : ""}`}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                    />
                  ) : (
                    <img
                      key={index}
                      src={item}
                      width={200}
                      alt={`Thumbnail ${index + 1}`}
                      className={`h-100 object-fit-cover me-1 ${activeIndex === index ? "selected" : ""}`}
                      onClick={() => setActiveIndex(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </Col>
          <Col lg={4} style={{ fontSize: "0.8rem" }}>
            <Row className="flex-column">
              <Col xs={12} className="mb-3">
                <img src={game.gameCover} alt="game-cover" width={"100%"} />
              </Col>
              <Col className="mb-3 ">
                <div className="line-clamp mx-3 mx-lg-0" style={{ fontSize: "1rem" }}>
                  {game.description}
                </div>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary mx-3 mx-lg-0">RATING:</span>
                  </Col>
                  <Col>{renderRatingStars(game.averageRating)}</Col>
                </Row>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary mx-3 mx-lg-0">RELEASE DATE:</span>
                  </Col>
                  <Col> {convertDate(game.releaseDate)}</Col>
                </Row>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary mx-3 mx-lg-0">DEVELOPER:</span>
                  </Col>
                  <Col> {game.developer}</Col>
                </Row>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary mx-3 mx-lg-0">PUBLISHER:</span>
                  </Col>
                  <Col> {game.publisher}</Col>
                </Row>
              </Col>
              <div className="mx-3 mx-lg-0 mb-3 mb-lg-0">
                <div className="text-secondary ">Game genres:</div>
                {game.genres.map((genre, index) => (
                  <Badge key={index} bg="secondary" className="rounded-0 p-1 me-1 mb-1 ">
                    {genre}
                  </Badge>
                ))}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GameCarousel;
