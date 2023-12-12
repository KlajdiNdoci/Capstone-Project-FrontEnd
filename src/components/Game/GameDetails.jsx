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
  const [gameImages, setGameImages] = useState();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    setGameImages(game ? [game.trailer, ...game.gameImages] : []);
    dispatch(getSingleGame(gameId, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.id]);

  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      {game && gameImages && (
        <>
          <GameCarousel images={gameImages} game={game} />
          <GameReviews game={game} />
        </>
      )}
    </Container>
  );
};

export default GameDetails;
