import React from "react";
import { Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  bax-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  > div:first-child {
    width: 40%;
    border-top-left-raius: 5px;
    border-bottom-left-radius: 5px;
    background-size: cover;
  }
  > div:last-child {
    padding: 15px 20px;
    min-height: 150px;
  }
`;

const MenuItem = ({ item, onEdit, onDelete, shoppingCart, onOrder, color }) => {
  console.log(shoppingCart);
  return (
    <Container active={item.is_available}>
      <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
      <Col xs={7} className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">
              <b>{item.name}</b>
            </h4>
            <div>
              {onEdit && (
                <Button variant="link" onClick={onEdit}>
                  <BiEdit size={25} />
                </Button>
              )}
              {onDelete && (
                <Button variant="link" onClick={onDelete}>
                  <AiFillDelete size={25} color="red" />
                </Button>
              )}
            </div>
          </div>
          <p className="mb-4">{item.description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <h5 className="mb-0 text-standard">
              <b style={{ color: color }}>${item.price}</b>
            </h5>
            {onOrder && (
              <Button
                onClick={() => onOrder(item)}
                className="mt-2"
                style={{ backgroundColor: color }}
              >
                {!item.quantity
                  ? "+ Add to cart"
                  : `$Add One More (+1) ${item.quantity}`}
              </Button>
            )}
          </div>
          {!item.is_available ? (
            <small className="text-secondary">Not Available</small>
          ) : null}
        </div>
      </Col>
    </Container>
  );
};

export default MenuItem;
