import { Button, Container, Form, InputGroup } from "react-bootstrap";
import HomeCarousel from "./HomeCarousel";
import HomeNews from "./HomeNews";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Star, StarFill, StarHalf } from "react-bootstrap-icons";
import { getSuggestions } from "../../redux/actions";

const HomeMain = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const noResultsRef = useRef(null);
  const token = useSelector(state => state.auth.token);
  const suggestions = useSelector(state => state.suggestions.content.content);

  const handleSubmit = async e => {
    e.preventDefault();
    window.location.href = "/games/search?q=" + query;
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSearchBarClick = e => {
    e.stopPropagation();
    if (query !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const renderRatingStars = averageRating => {
    const roundedRating = Math.round(averageRating * 2) / 2;

    const stars = [];
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} className="rating-color" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="rating-color" />);
    }

    const remainingStars = 5 - stars?.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="rating-color" />);
    }

    return stars;
  };
  useEffect(() => {
    if (query !== "") {
      const debounceTimeout = setTimeout(() => {
        dispatch(getSuggestions(query, token));
        setShowSuggestions(true);
      }, 1000);
      return () => clearTimeout(debounceTimeout);
    } else {
      setShowSuggestions(false);
    }
  }, [dispatch, query, token]);
  useEffect(() => {
    const handleClickOutsideSuggestions = e => {
      if (suggestionsRef.current && showSuggestions && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      } else if (noResultsRef.current && showSuggestions && !noResultsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutsideSuggestions);
    return () => {
      document.removeEventListener("click", handleClickOutsideSuggestions);
    };
  }, [showSuggestions]);

  useEffect(() => {
    setQuery("");
  }, [location]);

  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      <Form
        className="d-flex d-sm-none flex-grow-1 justify-content-center align-items-middle mt-3"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <Form.Control
            type="search"
            value={query}
            onChange={handleChange}
            onClick={handleSearchBarClick}
            placeholder="Search"
            className="border border-0"
            style={{ backgroundColor: "#316282", height: "50px", boxShadow: "none" }}
          />
          <Button
            className="border border-0 p-0 px-2 justify-content-center text-black"
            style={{ backgroundColor: "#64B8E7", width: "50px" }}
            type="submit"
          >
            <Search className="fs-5" />
          </Button>
          {showSuggestions && suggestions && (
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
                      navigate("/games/" + suggestion.id);
                    }}
                    key={suggestion.id}
                  >
                    <img src={suggestion.gameCover} alt="cover" className="me-3" width={100} />
                    <div className="text-truncate">
                      <div className="text-truncate">{suggestion.title}</div>
                      <div>{renderRatingStars(suggestion.averageRating)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </InputGroup>
      </Form>
      <HomeCarousel />
      <HomeNews />
    </Container>
  );
};

export default HomeMain;
