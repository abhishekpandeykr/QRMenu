import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPlaceById } from "../apis";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

export function Place() {
  const [place, setPlace] = useState({});

  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/places");
  };

  const onFetchPlace = async () => {
    const json = await fetchPlaceById(params.id, auth.token);
    if (json) {
      setPlace(json);
    }
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={35} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
            </div>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
}
