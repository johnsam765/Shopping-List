import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../actions/authAction";
const Logout = () => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <NavLink
        onClick={() => {
          dispatch(logoutSuccess());
        }}
        href="#"
      >
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
