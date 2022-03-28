import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.token) {
      navigate("/places");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(username, password, () => {
      navigate("/login");
    });
  };
  return (
    <MainLayout>
      <Row className="justify-content-center">
        <Col lg={6} md={8}>
          <Card>
            <Card.Body>
              <h3 className="text-center">
                <b>Register</b>
              </h3>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="standard"
                  className="mt-2"
                  onClick={handleSubmit}
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <Spinner
                      variant="standard"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Register;
