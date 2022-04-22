import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { AiOutlineQrcode, AiOutlineDelete } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  fetchPlaceById,
  deleteCategory,
  deleteMenuItem,
  deletePlace,
  updatePlace,
} from "../apis";
import MenuItem from "../components/MenuItems";
import MenuItemForm from "../containers/MenuItemForm";
import AuthContext from "../contexts/AuthContext";
import MainLayout from "../layout/MainLayout";
import QRCodeModel from "../components/QRCodeModel";

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
  const [qrCode, setQRCode] = useState(false);

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

  const showQRCodeModel = () => setQRCode(true);
  const hideQRCodeModel = () => setQRCode(false);

  const onDeletePlace = () => {
    const confirm = window.confirm("Are You Sure You want to Delete this?");
    if (confirm) {
      deletePlace(params.id, auth.token).then(onBack);
    }
  };

  const onDeleteCategory = (id) => {
    const confirm = window.confirm("Are You Sure You want to Delete this?");
    if (confirm) {
      deleteCategory(id, auth.token).then(onFetchPlace);
    }
  };

  const onDeleteMenuItem = (menuItemId) => {
    const confirm = window.confirm("Are You Sure You want to Delete this?");
    if (confirm) {
      deleteMenuItem(menuItemId, auth.token).then(onFetchPlace);
    }
  };

  const onUpdatePlace = async (tables) => {
    const response = await updatePlace(
      params.id,
      { number_of_tables: tables },
      auth.token
    );
    const body = await response;
    console.log("body is", body);
    if (body) {
      setPlace(body);
    }
  };

  useEffect(() => {
    onFetchPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={35} color="black" />
              </Button>
              <h3 className="mb-0 ml-2 mr-2">{place.name}</h3>
              <Button variant="link" onClick={onDeletePlace}>
                <AiOutlineDelete size={35} color="red" />
              </Button>
            </div>
            <Button variant="link" onClick={showQRCodeModel}>
              <AiOutlineQrcode size={35} color="black" />
            </Button>
            <Button variant="link" href={`/places/${params.id}/orders`}>
              <RiFileList3Line size={35} color="black" />
            </Button>
            <Button variant="link" href={`/places/${params.id}/settings`}>
              <FiSettings size={35} color="black" />
            </Button>
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
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2">
                  <b>{category.name}</b>
                </h4>
                <Button
                  variant="link"
                  onClick={() => onDeleteCategory(category.id)}
                >
                  <AiOutlineDelete size={35} color="red" />
                </Button>
              </div>
              {category.menu_items?.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    showModal();
                    setSelectedItem(item);
                  }}
                  onDelete={() => onDeleteMenuItem(item.id)}
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
            onDone={() => {
              onFetchPlace();
              hideModal();
            }}
            item={selectedItem}
          />
        </Modal.Body>
      </Modal>
      <QRCodeModel
        show={qrCode}
        onHide={hideQRCodeModel}
        place={place}
        onUpdatePlace={onUpdatePlace}
        centered
      />
    </MainLayout>
  );
}
