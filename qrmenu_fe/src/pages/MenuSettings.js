import React, { useState, useEffect, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ChromePicker } from "react-color";
import styled from "styled-components";
import { toast } from "react-toastify";

import { fetchPlaceById, updatePlace } from "../apis";
import MainLayout from "../layout/MainLayout";
import MenuList from "../components/MenuList";
import AuthContext from "../contexts/AuthContext";

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
`;

const MenuSettings = () => {
  const [places, setPlaces] = useState({});
  const [font, setFont] = useState("");
  const [color, setColor] = useState("");
  const params = useParams();
  const history = useNavigate();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onBack = () => history(`/places/${params.id}`);

  const onFetch = async () => {
    console.log("fetching places", params.id);
    const json = await fetchPlaceById(params.id);
    if (json) {
      setPlaces(json);
      setFont(json.font);
      setColor(json.color);
    }
  };
  useEffect(() => {
    onFetch();
  }, []);

  const onUpdatePlace = async () => {
    setLoading(true);
    const json = await updatePlace(places.id, { font, color }, auth.token);
    if (json) {
      toast.success("Place settings updated");
      setPlaces(json);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="black" />
        </Button>
        <h3 className="mb-0 mr-2 ml-2">Menu Settings</h3>
      </div>
      <Row>
        <Col md={4}>
          <Panel>
            <Form.Group>
              <Form.Label>Font</Form.Label>
              <Form.Control
                as="select"
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="Lato">Lato</option>
                <option value="Teko">Teko</option>
                <option value="Lobster">Lobster</option>
                <option value="Caveat">Caveat</option>
                <option value="Indie Flower">Indie Flower</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <ChromePicker
                color={color}
                onChangeComplete={(color) => setColor(color.hex)}
                width="100%"
              />
            </Form.Group>
            <Button
              className="mt-4"
              variant="standard"
              block
              onClick={onUpdatePlace}
              disabled={loading}
            >
              Save Settings
            </Button>
          </Panel>
        </Col>
        <Col md={8}>
          <MenuList
            place={places}
            font={font}
            color={color}
            onOrder={() => []}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default MenuSettings;
