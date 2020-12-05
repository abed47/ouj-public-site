import React, { useEffect, useContext, useState } from "react";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";
import { MDBRow, MDBCol } from "mdbreact";
import { MailIcon, PhoneIcon } from "./UI/Icons";
import { InformationContext } from "./context/InformationContext";
import "../assets/styles/App.scss";

const ContactUs = (props) => {
  const context = useContext(InformationContext);

  const [contact, setContact] = useState({});
  const [info, setInfo] = useState({});
  const [banners, setBanners] = useState([]);

  const loadData = () => {
    if (context.generalInfo) setInfo(context.generalInfo);
    if (context.contactInfo) setContact(context.contactInfo);
    if (context.banners) setBanners(context.banners);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <img src={banners[0]} alt="" />
        </MDBCol>

        <MDBCol size="12" className="p-0 contact-us_section">
          <h1 className="m-5">Contact Us</h1>
          <ul>
            {contact.phone1 ? <li>{phone(contact.phone1)}</li> : ""}
            {contact.phone2 ? <li>{phone(contact.phone2)}</li> : ""}
            {contact.email ? <li>{email(contact.email)}</li> : ""}
          </ul>
        </MDBCol>
      </MDBRow>
      <Footer
        caption1={info.caption1}
        caption2={info.caption2}
        wa={contact.phone1}
        fb={contact.facebook}
        insta={contact.instagram}
        twitter={contact.twitter}
      />
    </>
  );
};

export default ContactUs;
