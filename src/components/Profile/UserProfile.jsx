import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "../../redux/actions";
import { Container, Row, Col } from "react-bootstrap";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.content);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    dispatch(getProfile(token, userId));
  }, [dispatch, token, userId]);

  return (
    <>
      {user && (
        <Container fluid="lg" className="mt-4" style={{ paddingTop: "80px" }}>
          <div className="text-white p-4 rounded-3" style={{ backgroundColor: "#171D25" }}>
            <Row>
              <Col xs={12} md={8}>
                <div className="d-flex mb-3">
                  <img src={user.avatar} className="object-fit-cover me-3" width={164} alt="avatar" />
                  <div>
                    <div className="fs-3 mb-2">{user.username}</div>
                    <div className="mb-2">
                      {user.name} {user.surname}
                    </div>
                    <div>Email: {user.email}</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <h4>Friends</h4>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default UserProfile;
