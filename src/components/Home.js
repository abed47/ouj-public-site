import React, { useState, useEffect, useContext } from "react";
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
import { InformationContext } from "./context/InformationContext";
const Home = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [info, setInfo] = useState({});
  const context = useContext(InformationContext);

  const loadData = () => {
    loadItems();
    loadContact();
  };

  const loadContact = () => {
    let { contactInfo } = context;
    setContact(contactInfo);
    setInfo(context.generalInfo);
  };

  const loadItems = () => {
    let itemsArr = context.items;
    let arr = [];
    for (let i = 0; i < itemsArr.length && i < 3; i++) {
      console.log(itemsArr[i]);
      arr.push(itemsArr[i]);
    }
    setItems(itemsArr);
    console.log(items);
  };

  useEffect(() => {
    loadData();
  }, [context]);

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

        {items.map((item) => {
          return (
            <ProductCard
              key={item.id}
              imgUrl={item.imgUrl}
              itemTitle={item.name}
              itemBody="item short descripiton"
              md="4"
              lg="3"
              sm="8"
              size="3"
            />
          );
        })}

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
      <Footer
        wa={"https://wa.me/961" + contact.phone1}
        twitter={contact.twitter}
        insta={contact.instagram}
        fb={contact.facebook}
        caption1={info.caption1}
        caption2={info.caption2}
      />
    </>
  );
};

export default Home;
