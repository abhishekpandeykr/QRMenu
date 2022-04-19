import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import { fetchOrders } from "../apis";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const onBack = () => navigate(`/places/${params.id}`);

  useEffect(() => {
    const onFetchOrders = async () => {
      const json = await fetchOrders(params.id, auth.token);
      if (json) {
        setOrders(json);
        console.log(json);
      }
    };
    onFetchOrders();
  }, [auth.token, params.id]);

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="#000" />
        </Button>
        <h3 className="mb-0 ml-2 mr-2">My Orders</h3>
      </div>
      <Row className="justify-content-center">
        {orders?.map((order) => (
          <Col key={order.id} lg={8}>
            {order.detail}
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Orders;
