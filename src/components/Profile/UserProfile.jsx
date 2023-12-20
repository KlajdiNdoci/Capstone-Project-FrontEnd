import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addRemoveFriend,
  getCurrentUserAction,
  getProfile,
  getUserFriends,
  getUserSavedGames,
  updateAvatar,
  updateProfile,
} from "../../redux/actions";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import EditProfileModal from "./EditProfileModal";
import EditAvatarModal from "./EditAvatarModal";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.content);
  const currentUser = useSelector(state => state.currentUser.content);
  const games = useSelector(state => state.userSavedGames.content.content);
  const friends = useSelector(state => state.userFriends?.content.content);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const isFriend = friends && friends.map(friend => friend.id).includes(currentUser.id);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowAvatarModal = () => setShowAvatarModal(true);
  const handleCloseAvatarModal = () => setShowAvatarModal(false);

  const handleSaveProfileChanges = async editedUser => {
    await dispatch(updateProfile(token, editedUser));
    await dispatch(getProfile(token, userId));
  };
  const handleSaveAvatar = async formData => {
    await dispatch(updateAvatar(token, formData));
    await dispatch(getCurrentUserAction(token));
    await dispatch(getProfile(token, userId));
  };

  useEffect(() => {
    dispatch(getProfile(token, userId));
    dispatch(getUserSavedGames(3, token, 0, userId));
    dispatch(getUserFriends(userId, 6, token));
  }, [dispatch, token, userId]);

  const handleAddFriend = async () => {
    await dispatch(addRemoveFriend(userId, token));
    await dispatch(getUserFriends(userId, 6, token));
  };

  return (
    <>
      {user && currentUser && games && friends && (
        <Container fluid="lg" className="text-white my-5 flex-grow-1" style={{ paddingTop: "80px" }}>
          <div className="text-white p-4 rounded-3 h-100 d-flex flex-column" style={{ backgroundColor: "#171D25" }}>
            <div>
              <Row>
                <Col xs={6} md={"auto"} className="d-flex mb-3">
                  <div className="position-relative">
                    <img
                      src={user.avatar}
                      width={120}
                      height={120}
                      className="object-fit-cover"
                      style={{ border: "2px solid rgb(77, 149, 177)" }}
                      alt="avatar"
                    />
                    <Button
                      variant="secondary"
                      className="d-flex p-1 m-1 avatar-btn border-1 border-dark"
                      onClick={handleShowAvatarModal}
                    >
                      <Pencil />
                    </Button>
                  </div>
                </Col>
                {currentUser.id === user.id ? (
                  <>
                    <Col xs={6} md={"auto"} className="d-flex justify-content-end order-md-3">
                      <div>
                        <Button variant="success" className="d-flex p-2" onClick={handleShowEditModal}>
                          Modify info
                        </Button>
                      </div>
                    </Col>
                  </>
                ) : (
                  <Col xs={6} md={"auto"} className="d-flex justify-content-end order-md-3">
                    <div>
                      <Button
                        variant={`${isFriend ? "danger" : "success"}`}
                        className="d-flex p-2 fs-7"
                        onClick={handleAddFriend}
                      >
                        {isFriend ? "REMOVE" : "ADD"}
                      </Button>
                    </div>
                  </Col>
                )}
                <Col>
                  <div>
                    <div className="fs-3 mb-2">{user.username}</div>
                    <div className="mb-2">
                      {user.name} {user.surname}
                    </div>
                    <div>Email: {user.email}</div>
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <Col xs={12} lg={8}>
                <h5 className="mt-4">Library</h5>
                <div className="profile-card-container p-3 rounded-1 ">
                  {games.length === 0 ? (
                    <div className="text-white">No games in the library.</div>
                  ) : (
                    games.map(game => (
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
                    ))
                  )}
                </div>
              </Col>
              <Col xs={12} lg={4}>
                <h5 className="mt-4">Friends</h5>

                <div className="profile-card-container flex-grow-1 p-3 rounded-1">
                  {friends.length === 0 ? (
                    <div className="text-white">No friends on the list.</div>
                  ) : (
                    friends.map(friend => (
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

                          <div className="d-flex flex-column justify-content-center">
                            <div className="fs-7">{friend.username}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Col>
            </Row>
          </div>

          <EditProfileModal
            show={showEditModal}
            handleClose={handleCloseEditModal}
            handleSave={handleSaveProfileChanges}
            user={user}
          />
          <EditAvatarModal
            show={showAvatarModal}
            handleClose={handleCloseAvatarModal}
            handleSaveAvatar={handleSaveAvatar}
            user={user}
          />
        </Container>
      )}
    </>
  );
};

export default UserProfile;
