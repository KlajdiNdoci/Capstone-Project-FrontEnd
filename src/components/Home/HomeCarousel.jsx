import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Android2, Apple, NintendoSwitch, Playstation, Steam, Xbox } from "react-bootstrap-icons";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.content.content);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const navigate = useNavigate();

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
    dispatch(getGames(10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="mt-5 text-white mb-3" style={{ fontSize: "1.1rem" }}>
        FEATURED & RECOMMENDED
      </h3>
      {games && (
        <Carousel
          className="my-box-shadow mb-5"
          style={{ backgroundColor: "#0E1821", border: "1px solid #1E2831", cursor: "pointer" }}
        >
          {games.map(game => (
            <Carousel.Item
              key={game.id}
              onClick={() => {
                navigate("/games/" + game.id);
              }}
            >
              <div className="d-flex">
                <img
                  src={hoveredImageIndex === null ? game.gameCover : game.gameImages[hoveredImageIndex]}
                  alt={game.title}
                  className="object-fit-cover me-3 carousel-cover"
                  style={{ width: "65%" }}
                />
                <div className="d-flex flex-column text-white text-truncate" style={{ width: "100%" }}>
                  <h3 className="text-truncate mt-4 mb-4 me-3">{game.title}</h3>
                  <div className="d-flex mb-3">
                    {[0, 1].map(index => (
                      <div key={index} className="me-3">
                        <img
                          src={game.gameImages[index]}
                          alt={`img-${index}`}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          className="img-fluid carousel-images"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="d-flex mb-3">
                    {[2, 3].map(index => (
                      <div key={index} className="me-3">
                        <img
                          src={game.gameImages[index]}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          alt={`img-${index}`}
                          className="img-fluid carousel-images"
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
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default HomeCarousel;
