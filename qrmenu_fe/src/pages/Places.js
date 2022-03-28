import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { fetchPlaces } from "../apis";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

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
  const [places, setPlaces] = useState([]);

  const onFetchPlaces = async () => {
    const placesres = await fetchPlaces(context.token);
    console.log(placesres, "values are");
    if (placesres) {
      setPlaces(placesres);
    }
  };

  useEffect(() => {
    onFetchPlaces();
  }, []);

  return (
    <MainLayout>
      <h3>My Places Are</h3>
      <Row>
        {places.map((place, index) => (
          <Col key={place.id} lg={4}>
            <Place>
              <div style={{ backgroundImage: `url(${place.image})` }}></div>
              <p>{place.name}</p>
            </Place>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default Places;
