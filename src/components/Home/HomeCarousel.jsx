import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Android2, Apple, NintendoSwitch, Playstation, Steam, Xbox } from "react-bootstrap-icons";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.content.content);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

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

  const handleMouseEnter = index => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  useEffect(() => {
    dispatch(getGames(10, token));
  }, [dispatch, token]);

  return (
    <>
      <div className="mt-5 d-flex text-white justify-content-between">
        <h3 className=" mb-3" style={{ fontSize: "1.1rem" }}>
          FEATURED & RECOMMENDED
        </h3>
        <div onClick={() => navigate("/games/")} className="text-secondary cursor-pointer d-none d-sm-block">
          See all games
        </div>
      </div>
      {games && (
        <Carousel
          className="my-box-shadow mb-5"
          style={{ backgroundColor: "#0E1821", cursor: "pointer" }}
          interval={10000000000000000}
        >
          {games.map(game => (
            <Carousel.Item
              key={game.id}
              onClick={() => {
                navigate("/games/" + game.id);
              }}
            >
              <Row>
                <Col xs={12} lg={8}>
                  <img
                    src={hoveredImageIndex === null ? game.gameCover : game.gameImages[hoveredImageIndex]}
                    alt={game.title}
                    className="object-fit-cover me-3 carousel-cover w-100"
                  />
                </Col>
                <Col xs={4} className="d-none d-lg-flex">
                  <div className="flex-column text-white text-truncate">
                    <h3 className="text-truncate mt-4 mb-4 me-3">{game.title}</h3>
                    <div className="d-flex mb-3">
                      {[0, 1].map(index => (
                        <div key={index} className="me-3 w-100">
                          <img
                            src={game.gameImages[index]}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            alt={`img-${index}`}
                            className="img-fluid carousel-images object-fit-cover w-100"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="d-flex mb-3">
                      {[2, 3].map(index => (
                        <div key={index} className="me-3 w-100">
                          <img
                            src={game.gameImages[index]}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            alt={`img-${index}`}
                            className="img-fluid carousel-images object-fit-cover "
                          />
                        </div>
                      ))}
                    </div>
                    <div className="d-flex">
                      {[0, 1, 2].map(index => (
                        <Badge key={index} bg="secondary" className="rounded-1 me-2">
                          {game.genres[index]}
                        </Badge>
                      ))}
                    </div>
                    <div className="d-flex mb-3 justify-content-end me-3" style={{ marginTop: "auto" }}>
                      {game.platforms.map((platform, index) => (
                        <div key={index} className="fs-4 ms-2">
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="p-2 text-white d-lg-none">
                <div className="mb-2">{game.title}</div>
                <div className="mb-2">
                  {[0, 1, 2].map(index => (
                    <Badge key={index} bg="secondary" className="rounded-1 me-2">
                      {game.genres[index]}
                    </Badge>
                  ))}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default HomeCarousel;
