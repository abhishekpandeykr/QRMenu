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

export const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
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
