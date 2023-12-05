import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../../redux/actions";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.content.content);

  useEffect(() => {
    dispatch(getGames(10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="mt-5 text-white" style={{ fontSize: "1.1rem" }}>
        FEATURED & RECOMMENDED
      </h3>
      {games && (
        <Carousel className=" my-box-shadow" style={{ backgroundColor: "#0E1821", border: "1px solid gray" }}>
          {games.map(game => (
            <Carousel.Item key={game.id}>
              <div className="d-flex">
                <img src={game.gameCover} className="object-fit-cover me-4" alt="cover" style={{ width: "65%" }} />
                <div className="d-flex flex-column text-white text-truncate">
                  <h3 className="text-truncate">{game.title}</h3>
                  <div className="d-flex">
                    <img src={game.gameImages[1]} alt="" />
                    <img src={game.gameImages[1]} alt="" />
                  </div>
                  <div className="d-flex">
                    <img src={game.gameImages[1]} alt="" />
                    <img src={game.gameImages[1]} alt="" />
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
