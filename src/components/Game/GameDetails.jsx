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

  const allGameImages = game ? [game.trailer, ...game.gameImages] : [];

  useEffect(() => {
    dispatch(getSingleGame(gameId));
    console.log(gameId);
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
