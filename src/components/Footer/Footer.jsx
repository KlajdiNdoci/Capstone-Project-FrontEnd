import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <Container className="mt-auto mb-5 mb-lg-0">
        <Row className="py-4">
          <Col md={6}>
            <h5>Contacts</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </Col>
          <Col md={6}>
            <h5>Follow us</h5>
            <p>Facebook | Twitter | Instagram</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-secondary text-center">© 2023 Klajdi Ndoci. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
