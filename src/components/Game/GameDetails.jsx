import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSingleGame } from "../../redux/actions";
import { useParams } from "react-router-dom";
import GameCarousel from "./GameCarousel";
import GameReviews from "./GameReviews";

const GameDetails = () => {
  const { gameId } = useParams();
  const game = useSelector(state => state.singleGame.content);
  const [gameImages, setGameImages] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    dispatch(getSingleGame(gameId, token));
  }, [dispatch, gameId, token]);

  useEffect(() => {
    setGameImages([game.trailer, ...(game.gameImages || [])]);
  }, [game]);

  return (
    <Container fluid="lg" className="px-3 px-md-5" style={{ paddingTop: "80px" }}>
      {game.gameImages && (
        <>
          <GameCarousel images={gameImages} game={game} />
          <GameReviews game={game} />
        </>
      )}
    </Container>
  );
};

export default GameDetails;
