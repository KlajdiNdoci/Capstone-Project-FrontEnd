// Import necessari
import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAVE_TOKEN, login } from "../../redux/actions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      dispatch(login(email, password, navigate));
    }

    setValidated(true);
  };

  useEffect(() => {
    dispatch({ type: SAVE_TOKEN, payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid="lg" style={{ paddingTop: "80px" }} className="h-100 d-flex flex-column text-white px-3 px-md-5">
        <div style={{ height: "30px" }}>{message && <Alert variant="danger">{message}</Alert>}</div>
        <div className=" my-box-shadow rounded-3 p-4 shadow bg-dark mb-5 my-3">
          <div className="mb-4">
            <h2>LOGIN TO YOUR ACCOUNT</h2>
          </div>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="d-flex flex-column"
            style={{ height: "300px" }}
          >
            <Form.Group className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                autoComplete="username"
                type="email"
                onChange={e => setEmail(e.target.value)}
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

            <Form.Group className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
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

            <Button className="mt-auto" variant="outline-primary" type="submit" style={{ width: "100px" }}>
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
