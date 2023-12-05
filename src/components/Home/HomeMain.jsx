import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeCarousel";

const HomeMain = () => {
  return (
    <Container fluid="lg" style={{ paddingTop: "80px" }}>
      <HomeCarousel />
    </Container>
  );
};

export default HomeMain;
