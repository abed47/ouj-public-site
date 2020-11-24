import React, { useState } from "react";
import oujLogo from "../assets/images/ouj.png";
import heroTop from "../assets/images/hero-top.png";
import heroBottom from "../assets/images/hero-bottom.png";
import heroBg from "../assets/images/herobg.png";
import whatsAppIcon from "../assets/images/whatsapp-icon.png";
import instagramIcon from "../assets/images/instagram-icon.png";
import facebookIcon from "../assets/images/fb-icon.png";
import twitterIcon from "../assets/images/twitter-icon.png";
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
  MDBRow,
  MDBCol,
} from "mdbreact";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ProductCard from "./UI/ProductCard";
import PromoCard from "./UI/PromoElement";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
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
      <MDBRow className="hero2 m-0">
        <img src={heroTop} alt="" className="hero-top" />
        <img src={heroBg} alt="" className="hero-img" />
        <img src={heroBottom} alt="" className="hero-bottom" />
      </MDBRow>
      <MDBRow center className="product-section m-0">
        <MDBCol size="12" className="text-center">
          <div className="section-title">
            <h1 className="section-title-text">OUJ PETROLEUM</h1>
            <h4 className="section-title-subheader title m-5">Saida - lebanon</h4>
          </div>
        </MDBCol>

        <ProductCard
          imgUrl="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
          itemTitle="Title 1"
          itemBody="lorem ipsum h sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda fds fsdf sdfjlsd fsdfjsd fsdfjsd f"
          md="4"
          lg="3"
          sm="8"
          size="3"
        />
        <ProductCard
          imgUrl="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
          itemTitle="Title 1"
          itemBody="lorem ipsum h sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda fds fsdf sdfjlsd fsdfjsd fsdfjsd f"
          md="4"
          lg="3"
          sm="8"
          size="3"
        />
        <ProductCard
          imgUrl="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
          itemTitle="Title 1"
          itemBody="lorem ipsum h sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda sdaflk;sajf sadf sdfsdfj;sda fds fsdf sdfjlsd fsdfjsd fsdfjsd f"
          md="4"
          lg="3"
          sm="8"
          size="3"
        />

        <MDBCol size="12" className="text-center show-more">
          <Link to="/product">
            <h2 className="show-more-products">Show More</h2>
          </Link>
        </MDBCol>
      </MDBRow>

      <MDBRow className="m-0 p-0 promo-section">
        <PromoCard
          imgUrl="https://via.placeholder.com/400"
          title="title 1"
          description="helo world lksdfjdslafksadfjkdaslf;jasrfl"
          direction="left"
        />
        <PromoCard
          imgUrl="https://via.placeholder.com/400"
          title="title 1"
          description="helo world lksdfjdslafksadfjkdaslf;jasrfl"
          direction="right"
        />
      </MDBRow>
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
    </Router>
  );
};

export default Home;
