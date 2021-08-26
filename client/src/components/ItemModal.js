import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../actions/ItemActions";
import axios from "axios";

export default function ItemModal() {
  const dispatch = useDispatch();
  const [state, setState] = useState([{ modal: false, name: "" }]);
  const toggle = () => {
    setState({ ...state, modal: !state["modal"] });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = { name: state.name };
    post(newItem);
    toggle();
  };
  function onChanged(e) {
    setState({ ...state, name: e.target.value });
  }
  const post=(item)=>
  {
    axios.post("/api/items",item)
    .then(res=>dispatch(addItem(res.data)))
  }
  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2em" }} onClick={toggle}>
        Add Item
      </Button>
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to the Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                value={state.name}
                id="item"
                placeholder="Add Shopping Item"
                onChange={onChanged}
              ></Input>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
