import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Search } from "react-bootstrap-icons";
import Bottombar from "./Bottombar";
import { getCurrentUserAction } from "../../redux/actions";

const MyNavbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector(state => state.currentUser.content);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(getCurrentUserAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar fixed="top" expand="lg" style={{ height: "80px", backgroundColor: "#171D25" }} className="p-0">
        <Container fluid="xl" style={{ height: "100%" }}>
          <Row className="flex-grow-1 " style={{ height: "100%" }}>
            <Col xs={1} lg={4} className="p-1  align-items-center d-none d-md-flex">
              <Link to="/" className="me-2">
                <img
                  src="https://res.cloudinary.com/klajdindoci/image/upload/v1701440271/6a72da74-fe3b-4a3a-86e7-9007c9c0d445_1_pyuxtp.png"
                  width={60}
                  alt="Platform icon"
                  className="object-fit-cover me-2"
                />
              </Link>

              <Form style={{ maxWidth: "280px" }} className="flex-grow-1 d-none d-lg-block ">
                <InputGroup>
                  <Form.Control
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Cerca"
                    className="border border-0"
                    style={{ backgroundColor: "#316282" }}
                  />
                  <InputGroup.Text
                    id="basic-addon1"
                    className="border border-0 p-0 px-2"
                    style={{ backgroundColor: "#64B8E7" }}
                  >
                    <Search />
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </Col>
            <Col
              xs={1}
              className="nav-link d-flex justify-content-center d-md-none"
              style={{
                color: "#8d8d8d",
                height: "100%",
                backgroundColor: "transparent",
              }}
            >
              <Link to="/profile/" className="m-auto">
                <img src={user?.image} width={32} height={32} className="rounded-circle object-fit-cover" alt="user" />
              </Link>
            </Col>
            <Col className="py-2 px-0 d-flex d-md-none ">
              <Form className="d-flex flex-grow-1 justify-content-center">
                <InputGroup>
                  <InputGroup.Text
                    id="basic-addon1"
                    className="border border-0 p-0 px-2"
                    style={{ backgroundColor: "#EDF3F8" }}
                  >
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Cerca"
                    className="border border-0"
                    style={{ backgroundColor: "#EDF3F8" }}
                  />
                </InputGroup>
              </Form>
            </Col>
            <Col xs={1} className="d-md-none" style={{ height: "100%" }}>
              <Link
                className="nav-link d-flex flex-column p-0 align-items-center  justify-content-center "
                style={{ color: "#8d8d8d", height: "100%" }}
              ></Link>
            </Col>
            <Col xs={1} className="d-md-none" style={{ height: "100%" }}>
              <Link
                to="/comments/"
                className="nav-link d-flex flex-column p-0 align-items-center justify-content-center "
                style={{ color: "#8d8d8d", height: "100%" }}
              ></Link>
            </Col>

            <Col xs={10} lg={7} className="align-items-center flex-grow-1 d-none d-md-flex">
              <Row className="flex-grow-1" style={{ height: "100%" }}>
                <Col className="d-lg-none" style={{ height: "100%" }}>
                  <Link
                    className="nav-link d-flex flex-column p-0 align-items-center justify-content-center "
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <Search size={20} />
                    <span className="d-none d-md-block">Cerca</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/"
                    className={`nav-link d-flex flex-column p-0 align-items-center justify-content-center ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <span className="d-none d-md-block"> Home</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/mynetwork/"
                    className={`nav-link d-flex flex-column p-0 align-items-center justify-content-center ${
                      location.pathname.includes("/mynetwork/") ? "active" : ""
                    }`}
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <span className="d-none d-md-block">Rete</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/jobs/none"
                    className={`nav-link d-flex flex-column p-0 align-items-center justify-content-center ${
                      location.pathname.includes("jobs") ? "active" : ""
                    }`}
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <span className="d-none d-md-block"> Lavoro</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/messaging/"
                    className={`nav-link d-flex flex-column p-0 align-items-center justify-content-center ${
                      location.pathname.includes("/messaging/") ? "active" : ""
                    }`}
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <span className="d-none d-md-block"> Messaggistica</span>
                  </Link>
                </Col>
                <Col style={{ height: "100%" }}>
                  <Link
                    to="/notifications/"
                    className={`nav-link d-flex flex-column p-0 align-items-center justify-content-center ${
                      location.pathname.includes("/notifications") ? "active" : ""
                    }`}
                    style={{ color: "#8d8d8d", height: "100%" }}
                  >
                    <span className="d-none d-md-block">Notifiche</span>
                  </Link>
                </Col>
              </Row>
              <Col className=" d-none d-md-block" style={{ height: "100%" }}>
                <Dropdown
                  className="nav-link d-flex flex-column p-0 align-items-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <Dropdown.Toggle
                    className="nav-link"
                    id="dropdown-basic"
                    style={{
                      color: "#8d8d8d",
                      height: "100%",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="m-auto">
                      <img
                        src={user?.avatar}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                        alt="user"
                        className="object-fit-cover"
                      />

                      <span>{user?.username}</span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="border rounded-0 rounded-start rounded-bottom my-navbar-dropdown pb-0 shadow-sm mt-2 "
                    drop={"start"}
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="text-decoration-none dropdown-item p-2 " style={{ backgroundColor: "white" }}>
                      <div className="d-flex">
                        <div className="p-2">
                          <img
                            src={user?.image}
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "50%",
                            }}
                            // className="rounded-circle"
                            alt="user"
                            className="object-fit-cover"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6>
                            {user?.name} {user?.surname}
                          </h6>

                          <p>{user?.title}</p>
                        </div>
                      </div>

                      <Button
                        id="navbar-button"
                        variant="outline-primary"
                        className="rounded-pill py-0"
                        size="sm"
                        style={{
                          backgroundColor: "transparent",
                          color: "#0d6efd",
                          width: "100%",
                        }}
                        onClick={() => {
                          navigate("/profile/");
                          dispatch(getCurrentUserAction());
                        }}
                      >
                        Visualizza profilo
                      </Button>
                    </div>
                    <hr className="m-0" />
                    <h6 className="pt-3 ps-3">Account</h6>
                    <Dropdown.Item>Prova premium gratis</Dropdown.Item>
                    <Dropdown.Item>Impostazioni e privacy</Dropdown.Item>
                    <Dropdown.Item>Guida</Dropdown.Item>
                    <Dropdown.Item>Lingua</Dropdown.Item>
                    <hr className="m-0" />
                    <h6 className="pt-3 ps-3">Gestisci</h6>
                    <Dropdown.Item>Post e attivitá</Dropdown.Item>
                    <Dropdown.Item className="text-truncate">Account per la pubblicazione di offerte</Dropdown.Item>
                    <hr className="m-0" />
                    <Dropdown.Item>Esci</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <div className="d-md-none">
        <Bottombar />
      </div>
    </>
  );
};

export default MyNavbar;
