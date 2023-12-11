import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeNews = () => {
  const news = useSelector(state => state.news.content.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  useEffect(() => {
    dispatch(getNews(6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-5">
      <h3 className="text-white mb-3" style={{ fontSize: "1.1rem" }}>
        LATEST NEWS
      </h3>
      {news && (
        <Row className="mb-5">
          {news.map((article, index) => (
            <Col key={article.id} md={6} lg={4} xl={4} className={`mb-4 ${index >= 3 ? "d-none d-md-block" : ""}`}>
              <Card
                className="text-white cursor-pointer p-0 border-0 "
                onClick={() => {
                  navigate("/news/" + article.id);
                }}
              >
                <Card.Img src={article.game.gameCover} alt="Card image" className="rounded-0  my-box-shadow" />
                <Card.ImgOverlay className="overlay rounded-0 d-flex flex-column justify-content-between">
                  <Card.Title className="text-truncate pb-2 mb-0">{article.title}</Card.Title>
                  <div>
                    <Card.Text className="line-clamp mb-1" style={{ fontSize: "0.9rem" }}>
                      {article.content}
                    </Card.Text>
                    <Card.Text className="text-end" style={{ fontSize: "0.9rem" }}>
                      {formatDate(article.createdAt)}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeNews;
