import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { fetchPlaceById } from "../apis";
import MenuItem from "../components/MenuItems";
import MenuItemForm from "../containers/MenuItemForm";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
`;

export function Place() {
  const [place, setPlace] = useState({});
  const [menuItemFormShow, setMenuItemFormShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/places");
  };

  const onFetchPlace = async () => {
    const json = await fetchPlaceById(params.id, auth.token);
    if (json) {
      console.log("json is", json);
      setPlace(json);
    }
  };

  const showModal = () => {
    setMenuItemFormShow(true);
  };

  const hideModal = () => {
    setMenuItemFormShow(false);
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
      <Row>
        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>
        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <h4 className="mb-0 mr-2 mb-4">
                <b>{category.name}</b>
              </h4>
              {category.menu_items?.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    showModal();
                    setSelectedItem(item);
                  }}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>
      <Modal show={menuItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Menu Item</h4>
          <MenuItemForm
            place={place}
            onDone={() => hideModal()}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>
    </MainLayout>
  );
}
