import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";

const RegistrationPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(register);
    }

    setValidated(true);
  };

  return (
    <>
      <Container fluid="lg" className="h-100 d-flex align-items-center text-white">
        <div className="my-autoborder p-4 mt-3 shadow bg-dark">
          <div className="mb-5">
            <h2>CREATE YOUR ACCOUNT</h2>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                type="email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                style={{ boxShadow: "none", backgroundColor: "#32353C" }}
                className="input text-white"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Row xs={2}>
              <Col>
                <Form.Group className="mt-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    value={name}
                    type="text"
                    onChange={e => {
                      setName(e.target.value);
                    }}
                    style={{ boxShadow: "none", backgroundColor: "#32353C" }}
                    className="input text-white"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a name.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    required
                    value={surname}
                    type="text"
                    onChange={e => {
                      setSurname(e.target.value);
                    }}
                    style={{ boxShadow: "none", backgroundColor: "#32353C" }}
                    className="input text-white"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a surname.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    value={username}
                    type="text"
                    autoComplete="username"
                    onChange={e => {
                      setUsername(e.target.value);
                    }}
                    style={{ boxShadow: "none", backgroundColor: "#32353C" }}
                    className="input text-white"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    value={password}
                    type="password"
                    autoComplete="current-password"
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                    style={{ boxShadow: "none", backgroundColor: "#32353C" }}
                    className="input text-white"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="mb-2 "
              variant="outline-primary"
              type="submit"
              style={{ marginTop: "30px", width: "100px" }}
            >
              SignUp
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
export default RegistrationPage;
