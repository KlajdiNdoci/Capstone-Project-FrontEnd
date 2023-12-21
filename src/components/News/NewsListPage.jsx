import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions";

import { useNavigate } from "react-router-dom";
import MyPagination from "../Game/MyPagination";

const NewsListPage = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.content.content);
  const newsData = useSelector(state => state.news.content);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews(12, token));
  }, [dispatch, token]);

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  return (
    <Container className="d-flex flex-column flex-grow-1 px-3 px-md-5" fluid="lg" style={{ paddingTop: "80px" }}>
      {news && (
        <Row className="mt-5 d-flex flex-row">
          <h5 className="mb-3 text-white">ALL NEWS</h5>
          {news.map(news => (
            <Col key={news.id} md={6} xl={4} className={`mb-4`}>
              <Card
                className="text-white cursor-pointer p-0 border-0 "
                onClick={() => {
                  navigate("/news/" + news.id);
                }}
              >
                <Card.Img src={news.game.gameCover} alt="Card image" className="rounded-0  my-box-shadow" />
                <Card.ImgOverlay className="overlay rounded-0 d-flex flex-column justify-content-between">
                  <Card.Title className="text-truncate pb-2 mb-0">{news.title}</Card.Title>
                  <div>
                    <Card.Text className="line-clamp mb-1" style={{ fontSize: "0.9rem" }}>
                      {news.content}
                    </Card.Text>
                    <Card.Text className="text-end" style={{ fontSize: "0.9rem" }}>
                      {formatDate(news.createdAt)}
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <>
        <MyPagination dispatch={pageNumber => dispatch(getNews(12, token, pageNumber))} data={newsData} />
      </>
    </Container>
  );
};

export default NewsListPage;
