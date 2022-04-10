import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import StripeContext from "../containers/PaymentForm";
import OperationButton from "./OperationButton";

const ShoppingCart = ({
  items,
  decrementItem,
  incrementItem,
  onPaymentDone,
}) => {
  const totalPrice = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [items]);

  return (
    <div>
      <h3>Your Order</h3>
      <Card>
        <Card.Body>
          {items.map((item) => (
            <div key={item.id} className="d-flex mb-4 align-items-center">
              <div className="flex-grow-1">
                <p className="mb-0 ">
                  <b>{item.name}</b>
                </p>
                <span>${item.price}</span>
              </div>
              <div className="d-flex align-items-center">
                <OperationButton
                  variant="secondary"
                  size="sm"
                  onClick={() => decrementItem(item)}
                >
                  {" "}
                  -{" "}
                </OperationButton>
                <span>{item.quantity}</span>
                <OperationButton
                  variant="secondary"
                  size="sm"
                  onClick={() => incrementItem(item)}
                >
                  {" "}
                  +{" "}
                </OperationButton>
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <h5>
              <b>Total:</b>
            </h5>
            <h5>
              <b>${totalPrice}</b>
            </h5>
          </div>
          <hr className="mb-4" />
          <StripeContext
            amount={totalPrice}
            onDone={onPaymentDone}
            items={items}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
export default ShoppingCart;
