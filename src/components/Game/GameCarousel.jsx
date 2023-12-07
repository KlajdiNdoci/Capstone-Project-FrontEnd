import React, { useState } from "react";
import { Carousel, Row, Col } from "react-bootstrap";

const GameCarousel = ({ images, game }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="my-5 text-white">
      <h3 className="mb-4 text-truncate">{game.title}</h3>
      <div className="p-0" style={{ backgroundColor: "#0E1821", border: "1px solid #1E2831" }}>
        <Row>
          <Col lg={8}>
            <Carousel
              activeIndex={activeIndex}
              onSelect={handleSelect}
              className="mb-3 custom-carousel"
              interval={8000}
            >
              {images.map((item, index) => (
                <Carousel.Item key={index}>
                  {index === 0 ? (
                    <video src={item} width="100%" controls autoPlay={true} muted />
                  ) : (
                    <img src={item} alt={`Slide ${index + 1}`} className="d-block" width={"100%"} />
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="d-flex justify-content-start mt-3 thumbnail-container p-1">
              {images.map((item, index) => (
                <div key={index}>
                  {index === 0 ? (
                    <video
                      src={item}
                      width={200}
                      className={`me-1 ${activeIndex === index ? "selected" : ""}`}
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
                      className={`me-1 ${activeIndex === index ? "selected" : ""}`}
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
              <Col className="mb-3">
                <div style={{ fontSize: "1.1rem" }}>{game.description}</div>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary">RATING :</span>
                  </Col>
                  <Col> {game.averageRating}</Col>
                </Row>
              </Col>
              <Col className="mb-3">
                <Row>
                  <Col>
                    <span className="text-secondary">RELEASE DATE :</span>
                  </Col>
                  <Col> {game.releaseDate}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GameCarousel;
