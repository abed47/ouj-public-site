import React, { useState } from "react";
import ReactDom from "react-dom";
import heroTop from "../assets/images/hero-top.png";
import heroBottom from "../assets/images/hero-bottom.png";
import heroBg from "../assets/images/herobg.png";
import { MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import ProductCard from "./UI/ProductCard";
import PromoCard from "./UI/PromoElement";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";

const Home = (props) => {
  return (
    <>
      <NavBar />
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
      <Footer />
    </>
  );
};

export default Home;
