import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Search } from "react-bootstrap-icons";
import Bottombar from "./Bottombar";
import { getCurrentUserAction, getSuggestions } from "../../redux/actions";

const MyNavbar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const noResultsRef = useRef(null);

  const user = useSelector(state => state.currentUser.content);
  const suggestions = useSelector(state => state.suggestions.content.content);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query !== "") {
      const debounceTimeout = setTimeout(() => {
        dispatch(getSuggestions(query));
        setShowSuggestions(true);
      }, 1000);
      return () => clearTimeout(debounceTimeout);
    } else {
      setShowSuggestions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleClickOutsideSuggestions = e => {
    if (suggestionsRef.current && showSuggestions && !suggestionsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    } else if (noResultsRef.current && showSuggestions && !noResultsRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  const handleSearchBarClick = e => {
    e.stopPropagation();
    if (query !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    window.location.href = "/games/search?q=" + query;
  };

  useEffect(() => {
    dispatch(getCurrentUserAction());
    document.addEventListener("click", handleClickOutsideSuggestions);
    return () => {
      document.removeEventListener("click", handleClickOutsideSuggestions);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuery("");
  }, [location]);

  return (
    <>
      <Navbar fixed="top" expand="lg" style={{ height: "80px", backgroundColor: "#171D25" }} className="p-0 ">
        <Container fluid="lg" style={{ height: "100%" }}>
          <Row className="flex-grow-1 justify-content-center " style={{ height: "100%" }}>
            <Col xs={2} lg={4} className="p-1  align-items-center d-none d-md-flex justify-content-center">
              <Link to="/" className="mx-2">
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
                    <Search className="fs-5" />
                  </Button>

                  {showSuggestions && (
                    <div ref={suggestionsRef} className="suggestions-container">
                      {suggestions.length === 0 ? (
                        <div ref={noResultsRef} className="suggestion p-3">
                          No results found
                        </div>
                      ) : (
                        suggestions.map(suggestion => (
                          <div
                            className="suggestion d-flex"
                            onClick={() => {
                              navigate("/games/" + suggestion.id);
                            }}
                            key={suggestion.id}
                          >
                            <img src={suggestion.gameCover} alt="cover" className="me-3" width={100} />
                            <div className="text-truncate">
                              <div className="text-truncate">{suggestion.title}</div>
                              <div>{suggestion.averageRating}</div>
                            </div>
                          </div>
                        ))
                      )}
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
                    <Search className="fs-5" />
                  </Button>
                  {showSuggestions && (
                    <div ref={suggestionsRef} className="suggestions-container-mobile">
                      {suggestions.length === 0 ? (
                        <div ref={noResultsRef} className="suggestion p-3">
                          No results found
                        </div>
                      ) : (
                        suggestions.map(suggestion => (
                          <div
                            className="suggestion d-flex"
                            onClick={() => {
                              navigate("/game/" + suggestion.id);
                            }}
                            key={suggestion.id}
                          >
                            <img src={suggestion.gameCover} alt="cover" className="me-3" width={100} />
                            <div className="text-truncate">
                              <div className="text-truncate">{suggestion.title}</div>
                              <div>{suggestion.averageRating}</div>
                            </div>
                          </div>
                        ))
                      )}
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
                <span className="d-none d-md-block fs-5 fw-medium">HOME</span>
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
                <span className="d-none d-md-block fs-5 fw-medium">GAMES</span>
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
                <span className="d-none d-md-block fs-5 fw-medium "> NEWS</span>
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
                    <span className="fs-5">{user?.username}</span>
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
