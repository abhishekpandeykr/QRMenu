import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchPlaceById } from "../apis";

const Menu = () => {
  const [place, setPlace] = useState({});
  const params = useParams();

  const onFetchPlace = async () => {
    console.log(params);
    const json = await fetchPlaceById(params.id);
    if (json.success) {
      setPlace(json.data);
      console.log({ json });
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>Menu</Col>
      </Row>
    </Container>
  );
};

export default Menu;
