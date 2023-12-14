// GameListPage.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, getGames } from "../../redux/actions";
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
import { useNavigate } from "react-router-dom";
import MyPagination from "./MyPagination";

const GameListPage = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.content.content);
  const gamesData = useSelector(state => state.games.content);
  const token = useSelector(state => state.auth.token);
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState();
  const [paginationType, setPaginationType] = useState();
  const [forceRender, setForceRender] = useState(false);
  const navigate = useNavigate();
  const genres = [
    "ACTION",
    "RPG",
    "STRATEGIC",
    "ADVENTURE",
    "SIMULATION",
    "FPS",
    "RACING",
    "ARCADE",
    "FIGHTING",
    "PLATFORM",
    "TPS",
    "PUZZLE",
    "ROGUELIKE",
    "DATING",
    "SPACE",
    "TOWERDEFENSE",
    "CARDGAME",
    "SPORT",
  ];

  useEffect(() => {
    dispatch(getGames(5, token));
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

  const handleGenreChange = genre => {
    setSelectedGenre(genre);
    dispatch(filterGames(5, token, genre, "averageRating", "desc"));
  };
  const handleAllItems = () => {
    setSelectedGenre();
    dispatch(getGames(5, token));
    setForceRender(prev => !prev);
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

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <Container className="d-flex flex-column flex-grow-1" fluid="lg" style={{ paddingTop: "80px" }}>
      {games && (
        <Row className="mt-5 d-flex flex-column">
          <Col xs={12} className="mb-4">
            <div className="d-flex">
              <Button
                className="my-buttons me-2"
                onClick={() => {
                  setPaginationType("all");
                  handleAllItems();
                }}
              >
                ALL ITEMS
              </Button>
              <Dropdown>
                <Dropdown.Toggle className="my-buttons rounded-0 border-0" id="dropdown-basic">
                  {selectedGenre ? `GENRE: ${selectedGenre}` : "FILTER BY GENRE"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-0" style={{ backgroundColor: "#414a54" }}>
                  <Row>
                    {chunkArray(genres, 5).map((genreGroup, groupIndex) => (
                      <Col key={groupIndex}>
                        {genreGroup.map((genre, index) => (
                          <Dropdown.Item
                            className="my-buttons"
                            key={index}
                            onClick={() => {
                              handleGenreChange(genre);
                              setPaginationType("genre");
                            }}
                          >
                            {genre}
                          </Dropdown.Item>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          {games.map(game => (
            <Col xs={12} key={game.id} className="mb-4 cursor-pointer" onClick={() => navigate("/games/" + game.id)}>
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
      )}
      <>
        {selectedGenre && paginationType === "genre" ? (
          <MyPagination
            key={forceRender}
            dispatch={pageNumber => dispatch(filterGames(5, token, selectedGenre, "averageRating", "desc", pageNumber))}
            gamesData={gamesData}
            selectedGenre={selectedGenre}
          />
        ) : (
          <MyPagination
            key={forceRender}
            dispatch={pageNumber => dispatch(getGames(5, token, pageNumber))}
            gamesData={gamesData}
          />
        )}
      </>
    </Container>
  );
};

export default GameListPage;
