import React, { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { createPaymentIntet } from "../apis";
import AuthContext from "../contexts/AuthContext";

export const PaymentForm = ({ amount, items, onDone }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const auth = useContext(AuthContext);
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      setLoading(true);
      const json = await createPaymentIntet(
        {
          payment_method: paymentMethod,
          amount,
          place: params.id,
          table: params.table,
          detail: items,
        },
        auth.token
      );
      if (json?.success) {
        toast(`Your Order #${json.order} is Processing`, { type: "success" });
        onDone();
        setLoading(false);
      } else if (json?.error) {
        toast(json.error, { type: "error" });
        setLoading(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button
        variant="standard"
        type="submit"
        disabled={loading}
        className="mt-4"
      >
        {loading ? "Processing..." : "Pay"}
      </Button>
    </Form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51KmWlVSIRsxtgL1ICl2REZRWfgskmWLrLG4ADDJdDrJHsUiJw6BIEM9qfiVacucPsS0Yx7pTFslpBg819eiagjjl00khLiGLCQ"
);

const StripeContext = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripeContext;
