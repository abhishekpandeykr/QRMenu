import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  background-color: white;
  margin-bottom: 30px;
  bax-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow-x: hidden;
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

const MenuItem = ({ item }) => {
  return (
    <Container active={item.is_available}>
      <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
      <Col xs={7} className="d-flex flex-column justify-content-between w-100">
        <div>
          <h4 className="mb-2">
            <b>{item.name}</b>
          </h4>
          <p className="mb-4">{item.description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <h5 className="mb-0 text-standard">
              <b>${item.price}</b>
            </h5>
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
