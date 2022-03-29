import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { addPlaces } from "../apis";
import AuthContext from "../contexts/AuthContext";

const PlaceForm = ({ onDone }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const auth = useContext(AuthContext);

  const onClick = async () => {
    const response = await addPlaces({ name, image }, auth.token);
    if (response) {
      setName("");
      setImage("");
      onDone();
    }
  };
  return (
    <div>
      <h4 className="text-center">Place</h4>

      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image:</Form.Label>
        <Form.Control
          type="text"
          value={image}
          placeholder="Enter URL"
          onChange={(e) => setImage(e.target.value)}
        />
      </Form.Group>
      <Button variant="standard" className="mt-2" onClick={onClick}>
        Add Place
      </Button>
    </div>
  );
};

export default PlaceForm;
