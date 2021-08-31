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
  NavLink,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { returnErrors, clearError } from "../../actions/errorAction";
import { regFail, regSuccess } from "../../actions/authAction";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [locData, setlocData] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  });
  useEffect(() => {
    if (data.error.id === "REGISTER_FAIL") {
      setlocData({ ...locData, msg: data.error.msg.msg });
    } else {
      setlocData({ ...locData, msg: null });
    }
  }, [data.error.msg]);
  function toggle() {
    setlocData({
      ...locData,
      modal: !locData.modal,
      name: "",
      password: "",
      email: "",
      msg: null,
    });
    dispatch(clearError());
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = locData;
    const newUser = { name, email, password };
    reg(newUser);
  };
  function onChanged(e) {
    setlocData({
      ...locData,
      [e.target.name]: e.target.value,
    });
  }
  const reg = ({ name, email, password }) => {
    //   Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //   Request Body or the request data
    const body = JSON.stringify({ name, email, password });
    axios
      .post("/api/users", body, config)
      .then((res) => {
        dispatch(regSuccess(res.data));
        toggle();
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch(regFail());
      });
  };
  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={locData.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {locData.msg ? <Alert color="danger">{locData.msg}</Alert> : ""}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                value={locData.name}
                className="mb-3"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(id) => {
                  onChanged(id);
                }}
              ></Input>
              <Label for="email">Email</Label>
              <Input
                type="email"
                value={locData.email}
                name="email"
                id="email"
                className="mb-3"
                placeholder="Email"
                onChange={(id) => {
                  onChanged(id);
                }}
              ></Input>
              <Label for="password">Password</Label>
              <Input
                type="password"
                className="mb-3"
                value={locData.password}
                id="password"
                name="password"
                placeholder="password"
                onChange={(id) => {
                  onChanged(id);
                }}
              ></Input>
              <Button
                color="dark"
                style={{ marginTop: "2rem", width: "100%" }}
                block
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
