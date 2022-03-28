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

  const onSignUp = () => {
    navigate("/register");
  };

  const getLoginOrLogoutButton = (btnText, clickHandler, key = "") => (
    <Nav className="flex-grow-1 justify-content-end" key={key}>
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
          : [
              getLoginOrLogoutButton("Register", onSignUp, 1),
              getLoginOrLogoutButton("Sign In", signIn, 2),
            ]}
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
