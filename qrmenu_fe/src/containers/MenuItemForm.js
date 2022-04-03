import React, { useContext, useState, useRef } from "react";
import { Button, Overlay, Form, Popover, FormGroup } from "react-bootstrap";
import { RiPlayListAddFill } from "react-icons/ri";
import { toast } from "react-toastify";

import { addCategory, addMenuItems, updateMenuItem } from "../apis";
import AuthContext from "../contexts/AuthContext";
import ImageDropZone from "./ImageDropzone";

export default function MenuItemForm({ place, onDone, item = {} }) {
  console.log("item", item);
  const [categoryName, setCategoryName] = useState("");
  const [categoryFormShow, setCategoryFormShow] = useState(false);
  const target = useRef(null);

  const [category, setCategory] = useState(item.category || "");
  const [name, setName] = useState(item.name || "");
  const [price, setPrice] = useState(item.price || 0);
  const [description, setDescription] = useState(item.description || "");
  const [image, setImage] = useState(item.image);
  const [isAvailable, setAvailable] = useState(
    item.is_available === undefined ? true : !!item.is_available
  );

  const auth = useContext(AuthContext);

  const onAddCategory = async () => {
    const json = await addCategory(
      { name: categoryName, place: place.id },
      auth.token
    );
    if (json) {
      toast(`Category ${json.name} is Created.`, { type: "success" });
      setCategory(json.id);
      setCategoryName("");
      setCategoryFormShow(false);
      onDone(json);
    }
  };

  const onAddMenuItem = async () => {
    const json = await addMenuItems(
      {
        place: place.id,
        category,
        name,
        price,
        image,
        description,
        is_available: isAvailable,
      },
      auth.token
    );
    if (json) {
      console.log("json", json);
      toast(`Menu Item ${json.name} was created`, { type: "success" });
      setCategory("");
      setName("");
      setImage("");
      setAvailable(true);
      setDescription("");
      onDone();
    }
  };

  const onUpdateMenuItem = async () => {
    const json = await updateMenuItem(
      item.id,
      {
        place: place.id,
        category,
        name,
        price,
        description,
        image,
        is_available: isAvailable,
      },
      auth.token
    );
    if (json) {
      toast(`Menu Item ${json.name} was updated`, { type: "success" });
      setCategory("");
      setName("");
      setImage("");
      setAvailable(true);
      setDescription("");
      onDone();
    }
  };

  return (
    <div>
      {/* Categoris Form */}
      <FormGroup>
        <Form.Label>Category</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option />
            {place?.categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Control>
          <Button
            ref={target}
            variant="link"
            onClick={() => setCategoryFormShow(true)}
          >
            <RiPlayListAddFill size={25} />
          </Button>

          <Overlay
            show={categoryFormShow}
            target={target.current}
            placement="bottom"
            rootClose
            onHide={() => setCategoryFormShow(false)}
          >
            <Popover id="popover-contained">
              <Popover.Header as="h3">Category</Popover.Header>
              <Popover.Body>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="standard" block onClick={onAddCategory}>
                  Add Category
                </Button>
              </Popover.Body>
            </Popover>
          </Overlay>
        </div>
      </FormGroup>
      {/* Menu Item Form */}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image:</Form.Label>
        <ImageDropZone value={image} onChange={setImage} />
      </Form.Group>

      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Is Available"
          checked={isAvailable}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </Form.Group>

      <Button
        variant="standard"
        block
        onClick={item.id ? onUpdateMenuItem : onAddMenuItem}
      >
        {item.id ? "Update" : "+ Add"} Menu Item
      </Button>
    </div>
  );
}
