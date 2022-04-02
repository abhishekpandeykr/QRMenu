import React, { useContext, useState, useRef } from "react";
import { Button, Overlay, Form, Popover, FormGroup } from "react-bootstrap";
import { RiPlayListAddFill } from "react-icons/ri";
import { toast } from "react-toastify";

import { addCategory } from "../apis";
import AuthContext from "../contexts/AuthContext";

export default function MenuItemForm({ place, onDone }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryFormShow, setCategoryFormShow] = useState(false);
  const target = useRef(null);
  const [category, setCategory] = useState("");
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

  return (
    <div>
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
    </div>
  );
}
