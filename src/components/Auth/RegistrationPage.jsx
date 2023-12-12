import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_TOKEN, register } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.auth.message);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(register(name, surname, email, password, username, navigate));
    }

    setValidated(true);
  };

  useEffect(() => {
    dispatch({ type: SAVE_TOKEN, payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid="lg" className="h-100 d-flex flex-column justify-content-center text-white">
        <div style={{ height: "50px" }}>
          {message && (
            <Alert className="mb-0 " variant={`${message === "Registration successful!" ? "success" : "danger"}`}>
              {message}
            </Alert>
          )}
        </div>
        <div className=" my-box-shadow rounded-3 p-4 my-3 shadow bg-dark mb-4">
          <div className="mb-4">
            <h2>CREATE YOUR ACCOUNT</h2>
          </div>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="d-flex flex-column"
            style={{ height: "400px" }}
          >
            <Form.Group className="my-3">
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
              <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }}>
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }} type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Row xs={2}>
              <Col>
                <Form.Group className="my-3">
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
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }}>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }} type="invalid">
                    Please enter a name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-3">
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
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }}>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }} type="invalid">
                    Please enter a surname.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-3">
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
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }}>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }} type="invalid">
                    Please enter a username.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-3">
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
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }}>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback className="position-absolute" style={{ width: "200px" }} type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="mt-auto "
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
