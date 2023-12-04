import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Search } from "react-bootstrap-icons";
import Bottombar from "./Bottombar";
import { getCurrentUserAction, getSuggestions } from "../../redux/actions";

const MyNavbar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const suggestionsRef = useRef(null);

  const user = useSelector(state => state.currentUser.content);
  const suggestions = useSelector(state => state.suggestions.content.content);

  const handleChange = e => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (query.length >= 3) {
        dispatch(getSuggestions(query));
      }
    }, 1000);
    return () => clearTimeout(debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleClickOutsideSuggestions = e => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };
  const handleSearchBarClick = e => {
    e.stopPropagation();
    setShowSuggestions(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getCurrentUserAction());
    document.addEventListener("click", handleClickOutsideSuggestions);
    return () => {
      document.removeEventListener("click", handleClickOutsideSuggestions);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar fixed="top" expand="lg" style={{ height: "80px", backgroundColor: "#171D25" }} className="p-0">
        <Container fluid="xl" style={{ height: "100%" }}>
          <Row className="flex-grow-1 justify-content-center" style={{ height: "100%" }}>
            <Col xs={2} lg={4} className="p-1  align-items-center d-none d-md-flex justify-content-center">
              <Link to="/" className="me-2">
                <img
                  src="https://res.cloudinary.com/klajdindoci/image/upload/v1701440271/6a72da74-fe3b-4a3a-86e7-9007c9c0d445_1_pyuxtp.png"
                  alt="Platform logo"
                  width={50}
                  height={50}
                  className="m-auto"
                />
              </Link>

              <Form
                style={{ maxWidth: "500px", border: "none" }}
                className="flex-grow-1 d-none d-lg-block"
                onSubmit={handleSubmit}
              >
                <InputGroup>
                  <Form.Control
                    type="search"
                    value={query}
                    onChange={handleChange}
                    onClick={handleSearchBarClick}
                    placeholder="Cerca"
                    className="border border-0"
                    style={{ backgroundColor: "#316282", height: "50px", boxShadow: "none" }}
                  />
                  <Button
                    id="basic-addon1"
                    className="border border-0 p-0 px-2 justify-content-center text-black"
                    style={{ backgroundColor: "#64B8E7", width: "50px" }}
                    type="submit"
                  >
                    <Search />
                  </Button>
                  {query.length >= 3 && showSuggestions && (
                    <div ref={suggestionsRef} className="suggestions-container">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="suggestion d-flex">
                          <img src={suggestion.gameCover} alt="cover" className="me-3" width={100} />
                          <div className="text-truncate">
                            <div className="text-truncate">{suggestion.title}</div>
                            <div>{suggestion.averageRating}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </InputGroup>
              </Form>
            </Col>
            <Col
              xs={2}
              className="nav-link d-flex justify-content-center d-md-none m-auto"
              style={{
                color: "#8d8d8d",
                height: "100%",
                backgroundColor: "transparent",
              }}
            >
              <Link to="/" className="my-auto">
                <img
                  src="https://res.cloudinary.com/klajdindoci/image/upload/v1701440271/6a72da74-fe3b-4a3a-86e7-9007c9c0d445_1_pyuxtp.png"
                  alt="Platform logo"
                  width={50}
                  height={50}
                />
              </Link>
            </Col>
            <Col xs={8} className="d-flex d-lg-none my-auto p-0">
              <Form className="d-flex flex-grow-1 justify-content-center align-items-middle" onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    type="search"
                    value={query}
                    onChange={handleChange}
                    onClick={handleSearchBarClick}
                    placeholder="Cerca"
                    className="border border-0"
                    style={{ backgroundColor: "#316282", height: "50px", boxShadow: "none" }}
                  />
                  <Button
                    id="basic-addon1"
                    className="border border-0 p-0 px-2 justify-content-center text-black"
                    style={{ backgroundColor: "#64B8E7", width: "50px" }}
                    type="submit"
                  >
                    <Search />
                  </Button>
                  {query.length >= 3 && showSuggestions && (
                    <div ref={suggestionsRef} className="suggestions-container-mobile">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="suggestion d-flex">
                          <img src={suggestion.gameCover} alt="cover" className="me-3" width={100} />
                          <div className="text-truncate">
                            <div className="text-truncate">{suggestion.title}</div>
                            <div>{suggestion.averageRating}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </InputGroup>
              </Form>
            </Col>
            <Col xs={2} className="d-md-none m-auto p-0 d-flex justify-content-center" style={{ height: "100%" }}>
              <Link to="/profile/me" className="d-flex">
                <img
                  src={user?.avatar}
                  width={50}
                  className="object-fit-cover m-auto"
                  alt="user"
                  style={{ border: "solid 2px #4D95B1" }}
                />
              </Link>
            </Col>

            <Col className="d-none d-lg-block" style={{ height: "100%" }}>
              <Link
                to="/"
                className={`d-flex flex-column p-0 align-items-center justify-content-center ${
                  location.pathname === "/" ? "active" : "text-white text-decoration-none"
                }`}
                style={{ height: "100%" }}
              >
                <span className="d-none d-md-block fs-6 fw-medium">HOME</span>
              </Link>
            </Col>
            <Col className="d-none d-lg-block" style={{ height: "100%" }}>
              <Link
                to="/games/"
                className={`d-flex flex-column p-0 align-items-center justify-content-center ${
                  location.pathname.includes("/games/") ? "active" : "text-white text-decoration-none"
                }`}
                style={{ height: "100%" }}
              >
                <span className="d-none d-md-block fs-6 fw-medium">GAMES</span>
              </Link>
            </Col>

            <Col className="d-none d-lg-block" style={{ height: "100%" }}>
              <Link
                to="/news/"
                className={`d-flex flex-column p-0 align-items-center justify-content-center ${
                  location.pathname.includes("/news/") ? "active" : "text-white text-decoration-none"
                }`}
                style={{ height: "100%" }}
              >
                <span className="d-none d-md-block fs-6 fw-medium "> NEWS</span>
              </Link>
            </Col>

            <Col className="d-none d-md-flex justify-content-center" style={{ height: "100%" }}>
              <Dropdown className="nav-link p-0 d-flex" style={{ height: "100%" }}>
                <div className="d-flex align-items-center">
                  <Dropdown.Toggle
                    className="nav-link me-3 d-none d-lg-block"
                    id="dropdown-basic"
                    style={{
                      color: "#8d8d8d",
                      height: "100%",
                      backgroundColor: "transparent",
                    }}
                  >
                    <span>{user?.username}</span>
                  </Dropdown.Toggle>
                  <Link to={"/profile/me"}>
                    <img
                      src={user?.avatar}
                      width={50}
                      className="object-fit-cover m-auto"
                      alt="user"
                      style={{ border: "solid 2px #4D95B1" }}
                    />
                  </Link>
                </div>
                <Dropdown.Menu
                  id="profile-dropdown"
                  className="border-0 rounded-0 my-navbar-dropdown p-0 mt-2 "
                  drop={"start"}
                  style={{ backgroundColor: "#3D4450", fontSize: 15 }}
                >
                  <Dropdown.Item className="py-2 dropdown-item">View my profile</Dropdown.Item>
                  <Dropdown.Item className="py-2 dropdown-item">Language</Dropdown.Item>
                  <Dropdown.Item className="py-2 dropdown-item">Sign out of account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <div className="d-lg-none">
        <Bottombar />
      </div>
    </>
  );
};

export default MyNavbar;
