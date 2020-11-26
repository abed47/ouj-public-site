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
    <MDBRow className="footer m-0">
      <img src={heroTop} alt="" className="footer-top-img" />
      <MDBCol sm="5" md="5" className="footer-col">
        <h1 className="footer-title">Footer Title</h1>
        <p className="footer-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde ipsum, amet cumque nulla enim
          repudiandae quasi eligendi exercitationem dolore quos, nemo illo veritatis laborum architecto sit
          rerum beatae culpa voluptatem.
        </p>
        <p className="footer-icon-container">
          <Link className="footer-icon p-0 mr-2">
            <img src={instagramIcon} alt="" />
          </Link>
          <Link className="footer-icon p-0 mx-2">
            <img src={facebookIcon} alt="" />
          </Link>
          <Link className="footer-icon p-0 mx-2">
            <img src={twitterIcon} alt="" />
          </Link>
          <Link className="footer-icon p-0 mx-2">
            <img src={whatsAppIcon} alt="" />
          </Link>
        </p>
      </MDBCol>
      <MDBCol sm="5" md="2" className="footer-col">
        <h1 className="footer-title">title 2</h1>
        <Link to="#">link 1</Link>
        <Link to="#">link 2</Link>
      </MDBCol>
      <MDBCol sm="12" md="2" className="footer-col">
        <h1 className="footer-title">title 3</h1>
        <Link to="#">link 1</Link>
      </MDBCol>
      <MDBCol sm="12" md="2" className="footer-col">
        <h1 className="footer-title">title 3</h1>
        <Link to="#">link 1</Link>
        <Link to="#">link 2</Link>
        <Link to="#">link 2</Link>
      </MDBCol>
    </MDBRow>
  );
};

export default Footer;
