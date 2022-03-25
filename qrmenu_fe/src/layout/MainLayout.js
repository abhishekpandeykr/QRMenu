import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  let navigate = useNavigate();

  const signIn = () => {
    navigate("/login");
  };

  const gotoPlaces = () => {
    navigate("/places");
  };

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>
        <Nav className="flex-grow-1 justify-content-center">
          <Nav.Link onClick={gotoPlaces}>Places</Nav.Link>
        </Nav>
        <Nav className="flex-grow-1 justify-content-end">
          <Nav.Link onClick={signIn}>Login</Nav.Link>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
