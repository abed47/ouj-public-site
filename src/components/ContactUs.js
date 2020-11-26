import React from "react";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";
import { MDBRow, MDBCol } from "mdbreact";
import ContactUsBG from "../assets/images/aboutus-bg.png";
import { Link } from "react-router-dom";
import { MailIcon, PhoneIcon } from "./UI/Icons";
const ContactUs = (props) => {
  const phone = (val) => {
    if (val)
      return (
        <>
          <PhoneIcon /> <a href={"tel:" + val}> {val} </a>
        </>
      );
  };

  const email = (val) => {
    if (val)
      return (
        <>
          <MailIcon /> <a href={"mailto:" + val}>{val}</a>
        </>
      );
  };

  return (
    <>
      <NavBar />
      <MDBRow className="m-0 p-0">
        <MDBCol size="12" className="p-0 contact-us_hero">
          <img src={ContactUsBG} alt="" />
        </MDBCol>

        <MDBCol size="12" className="p-0 contact-us_section">
          <h1>Contact Us</h1>
          <ul>
            <li>{phone(76402094)}</li>
            <li>{email("abed472011@gmail.com")}</li>
          </ul>
        </MDBCol>
      </MDBRow>
      <Footer />
    </>
  );
};

export default ContactUs;
