import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchPlaceById } from "../apis";
import MenuList from "../components/MenuList";

const Menu = () => {
  const [place, setPlace] = useState({});
  const params = useParams();

  const onFetchPlace = async () => {
    const json = await fetchPlaceById(params.id);
    if (json) {
      setPlace(json);
      console.log(json, "response is");
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <MenuList place={place} />
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
