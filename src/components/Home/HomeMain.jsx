import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeCarousel";
import HomeNews from "./HomeNews";

const HomeMain = () => {
  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      <HomeCarousel />
      <HomeNews />
    </Container>
  );
};

export default HomeMain;
