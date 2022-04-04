import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchPlaces } from "../apis";
import PlaceForm from "../containers/PlaceForm";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

const AddPlaceButton = styled.div`
  border: 1px dashed gray;
  height: 200px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: #fbfbfb;
  }
`;

const Place = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    transform: scale(1.05);
  }
  > div {
    background-size: cover;
    height: 200px;
    border-radius: 5px;
  }
  > p {
    margin-top: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Places = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState(false);

  const onFetchPlaces = async () => {
    const placesres = await fetchPlaces(context.token);
    console.log(placesres, "values are");
    if (placesres) {
      setPlaces(placesres);
    }
  };

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);

  const onDone = () => {
    onFetchPlaces();
    onHide();
  };

  useEffect(() => {
    onFetchPlaces();
  }, []);

  return (
    <MainLayout>
      <h3>My Places Are</h3>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <PlaceForm onDone={onDone} />
        </Modal.Body>
      </Modal>
      <Row>
        {places.map((place, index) => (
          <Col key={place.id} lg={4}>
            <Place onClick={() => navigate(`/places/${place.id}`)}>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>
                <b>{place.name}</b>
              </p>
            </Place>
          </Col>
        ))}
        <Col lg={4}>
          <AddPlaceButton onClick={onShow}>Add New Place</AddPlaceButton>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Places;
