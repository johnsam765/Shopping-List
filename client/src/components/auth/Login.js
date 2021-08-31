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
import { logSuccess, loginFail } from "../../actions/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [locData, setlocData] = useState({
    modal: false,
    email: "",
    password: "",
    msg: null,
  });
  useEffect(() => {
    if (data.error.id === "LOGIN_FAIL") {
      setlocData({ ...locData, msg: data.error.msg.msg });
    } else {
      setlocData({ ...locData, msg: null });
    }
  }, [data.error.msg]);
  function toggle() {
    setlocData({
      ...locData,
      modal: !locData.modal,
      password: "",
      email: "",
      msg: null,
    });
    dispatch(clearError());
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = locData;
    const newUser = { email, password };
    reg(newUser);
  };
  function onChanged(e) {
    setlocData({
      ...locData,
      [e.target.name]: e.target.value,
    });
  }
  const reg = ({ email, password }) => {
    //   Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //   Request Body or the request data
    const body = JSON.stringify({ email, password });
    axios
      .post("/api/auth", body, config)
      .then((res) => {
        dispatch(logSuccess(res.data));
        toggle();
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch(loginFail());
      });
  };
  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Log-In
      </NavLink>
      <Modal isOpen={locData.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Log-In</ModalHeader>
        <ModalBody>
          {locData.msg ? <Alert color="danger">{locData.msg}</Alert> : ""}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                value={locData.email}
                name="email"
                id="email"
                className="mb-3"
                placeholder="Email"
                onChange={onChanged}
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

export default Login;
