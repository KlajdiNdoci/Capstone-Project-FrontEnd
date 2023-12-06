import React, { useEffect } from "react";
import { Badge, Container } from "react-bootstrap";
import { Android2, Apple, NintendoSwitch, Playstation, Steam, Xbox } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSingleGame } from "../../redux/actions";
import { useParams } from "react-router-dom";
import GameCarousel from "./GameCarousel";

const GameDetails = () => {
  const { gameId } = useParams();
  const game = useSelector(state => state.singleGame.content);
  const dispatch = useDispatch();

  const allGameImages = game ? [game.trailer, ...game.gameImages] : [];

  useEffect(() => {
    dispatch(getSingleGame(gameId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      {game && (
        <>
          <GameCarousel images={allGameImages} game={game} />
        </>
      )}
    </Container>
  );
};

export default GameDetails;
