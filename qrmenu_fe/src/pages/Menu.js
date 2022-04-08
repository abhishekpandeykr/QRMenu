import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchPlaceById } from "../apis";
import MenuList from "../components/MenuList";

const Menu = () => {
  const [place, setPlace] = useState({});
  const [shoppingCart, setShoppingCart] = useState({});
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

  const onUpdateShoppingCart = (item) => {
    setShoppingCart({
      ...shoppingCart,
      [item.id]: {
        ...item,
        quantity: (shoppingCart?.[item.id]?.quantity || 0) + 1,
      },
    });
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <MenuList
            place={place}
            shoppingCart={shoppingCart}
            onOrder={onUpdateShoppingCart}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
