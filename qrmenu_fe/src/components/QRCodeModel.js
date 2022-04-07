import React from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import QRCode from "./QRCode";

const OperationButton = styled(Button)`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  font-size: 20px;
  line-height: 18px;
`;

const QRCodeModel = ({ show, onHide, place, onUpdatePlace }) => {
  return (
    <Modal show={show} onHide={onHide} place={place} size="lg" centered>
      <Modal.Body className="text-center pt-4">
        <Container>
          <h3>Table QR Code</h3>
          <div className="d-flex align-items-center mt-4 mb-4">
            <h5 className="mb-0 mr-2">
              Total Tables : <b>{place.number_of_tables}</b>
            </h5>
            <OperationButton
              variant="lightgray"
              size="sm"
              onClick={() => onUpdatePlace(place.number_of_tables - 1)}
            >
              -
            </OperationButton>
            <OperationButton
              variant="lightgray"
              size="sm"
              onClick={() => onUpdatePlace(place.number_of_tables + 1)}
            >
              +
            </OperationButton>
          </div>
          <Row>
            {Array.from(
              { length: place.number_of_tables },
              (_, i) => i + 1
            ).map((table) => (
              <Col key={table} lg={4} md={6} className="mb-4">
                <QRCode table={table} placeId={place.id} />
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default QRCodeModel;
