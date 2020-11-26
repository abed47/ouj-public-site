import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";

import ReactDom from "react-dom";
import oujLogo from "../../assets/images/ouj.png";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MDBNavbar color="white" light className="no-shadow" expand="md">
      <MDBNavbarBrand>
        <strong className="white-text nav-logo">
          <img src={oujLogo} alt="" />
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          <MDBNavItem className="mx-2">
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem className="mx-2">
            <MDBNavLink to="/products">Products</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem className="mx-2">
            <MDBNavLink to="/contact-us">Contact Us</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default NavBar;
