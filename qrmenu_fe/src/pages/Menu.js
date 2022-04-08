import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import { fetchPlaceById } from "../apis";
import MenuList from "../components/MenuList";

const OrderButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  width: 60px;
  height: 60px;
`;

const Menu = () => {
  const [place, setPlace] = useState({});
  const [shoppingCart, setShoppingCart] = useState({});
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const params = useParams();

  const onFetchPlace = async () => {
    const json = await fetchPlaceById(params.id);
    if (json) {
      setPlace(json);
      console.log(json, "response is");
    }
  };

  const totalQuantity = useMemo(() => {
    let total = 0;
    Object.keys(shoppingCart).forEach((key) => {
      total += shoppingCart[key].quantity;
    });
    return total;
  }, [shoppingCart]);

  useEffect(() => {
    onFetchPlace();
  }, []);

  const onUpdateShoppingCart = (item) => {
    console.log(item, "item is");
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
      {totalQuantity && (
        <OrderButton
          variant="standard"
          onClick={() => setShowShoppingCart(!shoppingCart)}
        >
          {showShoppingCart ? <IoCloseOutline size={30} /> : totalQuantity}
        </OrderButton>
      )}
    </Container>
  );
};

export default Menu;
