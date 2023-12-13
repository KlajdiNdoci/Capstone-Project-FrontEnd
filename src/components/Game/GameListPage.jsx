// GameListPage.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";
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

const GameListPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.content.content);
  const token = useSelector(state => state.auth.token);
  const [hoveredGameId, setHoveredGameId] = useState(null);

  useEffect(() => {
    dispatch(getGames(10, token));
  }, [dispatch, token]);

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

  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      <Row className="mt-5">
        {games.map(game => (
          <Col xs={12} key={game.id} className="mb-4">
            <Card
              className="game-list-container text-white my-box-shadow d-flex flex-column flex-sm-row rounded-0"
              style={{ backgroundColor: "#414A54" }}
              onMouseEnter={() => setHoveredGameId(game.id)}
              onMouseLeave={() => setHoveredGameId(null)}
            >
              {hoveredGameId === game.id ? (
                <video className="game-list-image object-fit-cover " src={game.trailer} autoPlay muted loop />
              ) : (
                <Card.Img className="game-list-image object-fit-cover rounded-0 h-100" src={game.gameCover} />
              )}
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{game.title}</Card.Title>
                <div>
                  {game.genres.map((genre, index) => (
                    <Badge key={index} bg="secondary" className="rounded-0 p-1 me-1 mb-1 fs-8">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="d-flex ">
                  <div className="me-2">{game.releaseDate}</div>
                  {game.platforms.map((platform, index) => (
                    <div key={index} className="me-2 d-flex my-auto">
                      {getPlatformIcon(platform)}
                    </div>
                  ))}
                </div>
                <div>{renderRatingStars(game.averageRating)}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GameListPage;