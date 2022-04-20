import React from "react";
import { Card } from "react-bootstrap";

const Order = ({ order }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>{`Order #${order.id}- Table #${order.table}`}</span>
        <span>
          <b>${order.amount}</b>
        </span>
      </Card.Header>
      <Card.Body>
        {JSON.parse(order.details).map((item) => (
          <div className="mb-2" key={item.id}>
            <span>x {item.quantity}</span>
            <img
              src={item.image}
              alt="menu item"
              width={30}
              height={30}
              style={{ borderRadius: 3, margin: "0 10px" }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Order;
