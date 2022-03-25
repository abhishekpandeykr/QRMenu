import React, { useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const MainLayout = ({ children }) => {
  let navigate = useNavigate();
  const auth = useContext(AuthContext);

  const signIn = () => {
    navigate("/login");
  };

  const onSignOut = () => {
    auth.signOut();
  };

  const gotoPlaces = () => {
    navigate("/places");
  };

  const getLoginOrLogoutButton = (btnText, clickHandler) => (
    <Nav className="flex-grow-1 justify-content-end">
      <Nav.Link onClick={clickHandler}>{btnText}</Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar bg="light" variant="light" className="mb-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={gotoPlaces}>Places</Nav.Link>
        </Nav>
        {auth.token
          ? getLoginOrLogoutButton("Sign Out", onSignOut)
          : getLoginOrLogoutButton("Sign In", signIn)}
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
