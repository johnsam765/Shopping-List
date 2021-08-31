import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";
import { useSelector } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
const AppNavbar = () => {
  const data = useSelector((state) => state);
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state} navbar>
            <Nav className="ms-auto" navbar>
              {!data.auth.isAuthenticated ? (
                <Fragment>
                  <NavItem>
                    {/* <NavLink href="https://github.com/johnsam765">GitHub</NavLink> */}
                    <RegisterModal />
                  </NavItem>
                  <NavItem>
                    <Login />
                  </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem>
                    <NavLink>
                      <span className="navbar-text mx-5 ">
                        <strong className="mb-2">
                          {data.auth.user
                            ? `Welcome ${data.auth.user.name.toUpperCase()}`
                            : " "}
                        </strong>
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Logout />
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
