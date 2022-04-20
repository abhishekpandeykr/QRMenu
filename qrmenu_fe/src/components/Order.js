import React from "react";
import { Card, Button } from "react-bootstrap";

const Order = ({ order, onCompleteOrder }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>{`Order #${order.id}- Table #${order.table}`}</span>
        <span>
          <b>${order.amount}</b>
        </span>
      </Card.Header>
      <Card.Body className="d-flex justify-content-between">
        <div>
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
        </div>
        {onCompleteOrder && (
          <Button variant="standard" size="md" onClick={onCompleteOrder}>
            Done
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Order;
