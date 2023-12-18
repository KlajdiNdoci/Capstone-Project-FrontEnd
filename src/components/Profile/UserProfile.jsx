import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile, getUserFriends, getUserSavedGames } from "../../redux/actions";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.content);
  const currentUser = useSelector(state => state.currentUser.content);
  const games = useSelector(state => state.userSavedGames.content.content);
  const friends = useSelector(state => state.userFriends.content.content);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile(token, userId));
    dispatch(getUserSavedGames(3, token, 0, userId));
    dispatch(getUserFriends(userId, 6, token));
  }, [dispatch, token, userId]);

  return (
    <>
      {user && games && friends && (
        <Container fluid="lg" className="text-white my-5 flex-grow-1" style={{ paddingTop: "80px" }}>
          <div className="text-white p-4 rounded-3 h-100 d-flex flex-column" style={{ backgroundColor: "#171D25" }}>
            <div className="d-flex justify-content-between mb-4">
              <div className="d-flex">
                <img src={user.avatar} className="object-fit-cover me-3" width={120} height={120} alt="avatar" />
                <div>
                  <div className="fs-3 mb-2">{user.username}</div>
                  <div className="mb-2">
                    {user.name} {user.surname}
                  </div>
                  <div>Email: {user.email}</div>
                </div>
              </div>
              <div>
                <Button variant="success" className="d-flex p-2">
                  <Pencil />
                </Button>
              </div>
            </div>

            <Row>
              <Col xs={12} lg={8} className="d-flex flex-column">
                <h5 className="mt-4">Library</h5>
                <div className="profile-card-container p-3 rounded-1 ">
                  {games.map(game => (
                    <div key={game.id} className="py-2 cursor-pointer" onClick={() => navigate("/games/" + game.id)}>
                      <Card className="text-white d-flex flex-column flex-sm-row rounded-0 profile-card">
                        <Col xs={12} sm={4}>
                          <Card.Img className="object-fit-cover rounded-0 h-100" src={game.gameCover} />
                        </Col>
                        <Col>
                          <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>{game.title}</Card.Title>
                            <div>
                              {game.genres.map((genre, index) => (
                                <Badge key={index} bg="secondary" className="rounded-0 p-1 me-1 mb-1 fs-8">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            <div className="d-flex "></div>
                          </Card.Body>
                        </Col>
                      </Card>
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} lg={4} className="d-flex flex-column">
                <h5 className="mt-4">Friends</h5>

                <div className="profile-card-container flex-grow-1 p-3 rounded-1">
                  {friends.map(friend => (
                    <div
                      key={friend.id}
                      className="py-2 cursor-pointer"
                      onClick={() => navigate("/profile/" + friend.id)}
                    >
                      <div className="text-white d-flex  rounded-0 ">
                        <img
                          style={{ width: "40px" }}
                          className="object-fit-cover rounded-0 me-2"
                          src={friend.avatar}
                          alt="avatar"
                        />

                        <div className="d-flex flex-column justify-content-between">
                          <div className="fs-7">{friend.username}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default UserProfile;