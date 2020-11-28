import React from "react";
import heroTop from "../../assets/images/hero-top.png";
import heroBottom from "../../assets/images/hero-bottom.png";
import heroBg from "../../assets/images/herobg.png";
import whatsAppIcon from "../../assets/images/whatsapp-icon.png";
import instagramIcon from "../../assets/images/instagram-icon.png";
import facebookIcon from "../../assets/images/fb-icon.png";
import twitterIcon from "../../assets/images/twitter-icon.png";
import { MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <MDBRow className="footer mt-5 mx-0">
      <MDBCol sm="5" md="5" className="footer-col">
        <h1 className="footer-title">{props.caption1}</h1>
        <p className="footer-description">{props.caption2}</p>
        <p className="footer-icon-container">
          <a href={props.insta} className="footer-icon p-0 mr-2">
            <img src={instagramIcon} alt="" />
          </a>
          <a href={props.fb} className="footer-icon p-0 mx-2">
            <img src={facebookIcon} alt="" />
          </a>
          <a href={props.twitter} className="footer-icon p-0 mx-2">
            <img src={twitterIcon} alt="" />
          </a>
          <a href={"https://wa.me/961" + props.wa} className="footer-icon p-0 mx-2">
            <img src={whatsAppIcon} alt="" />
          </a>
        </p>
      </MDBCol>
      <MDBCol sm="5" md="3" lg="2" className="footer-col">
        <h1 className="footer-title">About</h1>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="#">Help</Link>
      </MDBCol>
      <MDBCol sm="12" md="3" lg="2" className="footer-col">
        <h1 className="footer-title">Services</h1>
        <Link to="/products">Our Products</Link>
      </MDBCol>
    </MDBRow>
  );
};

export default Footer;
