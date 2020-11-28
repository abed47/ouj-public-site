import React, { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import heroBg from "../assets/images/herobg.png";
import { MDBRow, MDBCol, MDBCarousel, MDBCarouselItem, MDBView, MDBCarouselInner } from "mdbreact";
import { Link } from "react-router-dom";
import ProductCard from "./UI/ProductCard";
import PromoCard from "./UI/PromoElement";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";
import { InformationContext } from "./context/InformationContext";
import convertToHtml from "draftjs-to-html";

const Home = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [banners, setBanners] = useState([]);
  const [info, setInfo] = useState({});
  const [offers, setOffers] = useState([]);
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
      arr.push(itemsArr[i]);
    }
    setItems(itemsArr);
    if (context.banners) setBanners(context.banners);
    if (context.offers) setOffers(context.offers);
  };

  const convertPromoDescription = (data) => {
    let d = JSON.parse(data);
    // let raw = convertToRaw(d);
    let html = convertToHtml(d);
    return html;
  };

  useEffect(() => {
    loadData();
  }, [context]);

  return (
    <>
      <NavBar />
      <MDBRow className="m-0 mb-5 p-0 ">
        <MDBCol size="12" className="m-0 p-0 h-50 slider-container">
          <MDBCarousel
            activeItem={1}
            length={banners.length}
            showControls={true}
            showIndicators={false}
            className="z-depth-1"
            slide
          >
            <MDBCarouselInner>
              {banners.map((banner, i) => {
                return (
                  <MDBCarouselItem key={i} itemId={i + 1}>
                    <MDBView>
                      <img className="d-block w-100" src={banner} />
                    </MDBView>
                  </MDBCarouselItem>
                );
              })}
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBCol>
      </MDBRow>
      <MDBRow center className="product-section m-0">
        <MDBCol size="12" className="text-center">
          <div className="section-title">
            <h1 className="section-title-text">OUJ PETROLEUM</h1>
            <h4 className="section-title-subheader title m-5">Saida - lebanon</h4>
          </div>
        </MDBCol>

        {items.map((item, i) => {
          if (i > 2) return;
          return (
            <ProductCard
              key={item.id}
              imgUrl={item.imgUrl}
              itemTitle={item.name}
              itemBody={item.description}
              md="4"
              lg="3"
              sm="8"
              size="3"
            />
          );
        })}

        <MDBCol size="12" className="text-center show-more">
          <Link to="/products">
            <h2 className="show-more-products">Show More</h2>
          </Link>
        </MDBCol>
      </MDBRow>

      <MDBRow className="m-0 p-0 promo-section">
        {offers.map((offer, i) => {
          return (
            <PromoCard
              imgUrl={offer.imgUrl}
              title={offer.title}
              description={convertPromoDescription(offer.description)}
              direction={`${i % 2}` == 0 ? "right" : "left"}
            />
          );
        })}
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
