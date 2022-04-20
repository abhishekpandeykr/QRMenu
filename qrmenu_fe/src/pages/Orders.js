import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import { fetchOrders, updateOrder } from "../apis";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";
import Order from "../components/Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const onBack = () => navigate(`/places/${params.id}`);

  const onFetchOrders = async () => {
    const json = await fetchOrders(params.id, auth.token);
    if (json) {
      setOrders(json);
      console.log(json);
    }
  };
  useEffect(() => {
    onFetchOrders();
    const interval = setInterval(onFetchOrders, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCompleteOrder = async (orderId) => {
    const json = await updateOrder(
      orderId,
      { status: "completed" },
      auth.token
    );
    if (json) {
      onFetchOrders();
    }
  };

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="#000" />
        </Button>
        <h3 className="mb-0 ml-2 mr-2">My Orders</h3>
      </div>
      <Row className="justify-content-center">
        {orders
          ?.filter((order) => order.status === "processing")
          ?.map((order) => (
            <Col key={order.id} lg={8}>
              <Order
                order={order}
                onCompleteOrder={() => onCompleteOrder(order.id)}
              />
            </Col>
          ))}
      </Row>
    </MainLayout>
  );
};

export default Orders;
