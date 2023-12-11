import { Col, Container, Navbar, Row } from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const location = useLocation();
  // const user = useSelector((state) => state.user.content);

  return (
    <>
      <Navbar fixed="bottom" expand="lg" style={{ height: "53px", zIndex: "10" }} className="bg-white p-0">
        <Container fluid="xl" style={{ height: "100%", backgroundColor: "#171D25" }}>
          <Row className="flex-grow-1 " style={{ height: "100%" }}>
            <Col xs={10} lg={7} className="d-flex align-items-center flex-grow-1">
              <Row className="flex-grow-1" style={{ height: "100%" }}>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/"
                    className={`d-flex flex-column p-0 align-items-center my-navbar-text justify-content-center ${
                      location.pathname === "/" ? "active" : "text-white text-decoration-none"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <span className="fw-medium fs-5"> HOME</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/games/"
                    className={`d-flex flex-column p-0 align-items-center my-navbar-text justify-content-center ${
                      location.pathname.includes("/games/") ? "active" : "text-white text-decoration-none"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <span className="fw-medium fs-5">GAMES</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/news/"
                    className={`d-flex flex-column p-0 align-items-center my-navbar-text justify-content-center ${
                      location.pathname.includes("/news/") ? "active" : "text-white text-decoration-none"
                    }`}
                    style={{ height: "100%" }}
                  >
                    <span className="fw-medium fs-5">NEWS</span>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default BottomBar;
