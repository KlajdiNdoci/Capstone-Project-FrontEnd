import React, { useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";

const GameCarousel = ({ images, game }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="my-5 text-white">
      <h3 className="mb-4 text-truncate">{game.title}</h3>
      <div className="p-0" style={{ backgroundColor: "#0E1821", border: "1px solid #1E2831", cursor: "pointer" }}>
        <Row>
          <Col lg={8}>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="mb-3 custom-carousel">
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} alt={`Slide ${index + 1}`} className="d-block" width={"100%"} />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="d-flex justify-content-start mt-3 thumbnail-container p-1">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  width={200}
                  alt={`Thumbnail ${index + 1}`}
                  className={`me-1 ${activeIndex === index ? "selected" : ""}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </Col>
          <Col lg={4}>
            <Row className="flex-column">
              <Col xs={12} className="mb-3">
                <img src={game.gameCover} alt="game-cover" width={"100%"} />
              </Col>
              <Col className="mb-3">
                <div>{game.description}</div>
              </Col>
              <Col className="mb-3">
                <div>RATING : {game.description}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GameCarousel;
