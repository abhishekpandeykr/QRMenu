import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="bg-light">
        <Container>
          <Row>
            <Col md={6} className="my-auto">
              <h1>
                <b>QR Menu</b>
              </h1>
              <h5 className="mt-4 mb-4">
                A Smart way to share your Digital Menu in a QR Code with Your
                Customer
              </h5>
              <br />
              <Button href="/places" variant="primary" size="lg">
                Create Your Menu
              </Button>
            </Col>
            <Col md={6} className="my-auto">
              <Image
                src="https://media1.giphy.com/media/26ufpSWPdJ9fwz5Wo/giphy.gif"
                rounded
                fluid
              />
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Home;
