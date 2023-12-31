// NewsDetail.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNews, getNewsDetails } from "../../redux/actions";
import { Container, Row, Col, Card } from "react-bootstrap";
import NewsComments from "./NewsComments";

const NewsDetail = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(state => state.newsDetails.content);
  const suggestedNews = useSelector(state => state.news.content.content);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  const convertDate = date => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString();
    return `${formattedDate}`;
  };

  useEffect(() => {
    dispatch(getNewsDetails(token, newsId));
    dispatch(getNews(5, token));
  }, [dispatch, newsId, token]);

  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }} className="my-5 text-white px-3 px-md-5">
      {news && (
        <>
          <Row className="mb-3 align-items-center">
            <Col xs={12} lg={8}>
              <h2>{news.title}</h2>
            </Col>
            <Col className="d-none d-lg-block">
              <h5>Recent news</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={8}>
              {news && (
                <div>
                  <img src={news.game.gameCover} className="object-fit-cover w-100 mb-3" alt="cover" />
                  <p className="fs-7">
                    News created by :
                    <span
                      className="cursor-pointer text-danger"
                      onClick={() => navigate("/profile/" + news.creator.id)}
                    >
                      {" "}
                      {news.creator?.username}
                    </span>{" "}
                    - {convertDate(news.createdAt)}
                  </p>
                  <p className="fs-5">{news.content}</p>
                  <NewsComments token={token} comments={news.comments} />
                </div>
              )}
            </Col>
            <Col className="d-none d-lg-block">
              {suggestedNews.map(article => (
                <Card
                  key={article.id}
                  className="text-white cursor-pointer p-0 border-0 mb-3"
                  onClick={() => {
                    navigate("/news/" + article.id);
                  }}
                >
                  <Card.Img src={article.game.gameCover} alt="Card image" className="rounded-0" />
                  <Card.ImgOverlay className="overlay rounded-0 d-flex flex-column justify-content-between">
                    <Card.Title className="pb-2 mb-0">{article.title}</Card.Title>
                    <div>
                      <Card.Text className="text-end" style={{ fontSize: "0.9rem" }}>
                        {convertDate(article.createdAt)}
                      </Card.Text>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default NewsDetail;
