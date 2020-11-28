import React, { useState, useEffect, useContext } from "react";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";
import { MDBRow, MDBCol } from "mdbreact";
import ContactUsBG from "../assets/images/aboutus-bg.png";
import LoadingPage from "./UI/LoadingPage";
import firebase from "../utils/firebase";
import ProductCard from "./UI/ProductCard";
import { InformationContext } from "./context/InformationContext";
const ProductsPage = (props) => {
  const context = useContext(InformationContext);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState({});
  const [contact, setContact] = useState({});

  const loadData = () => {
    if (context.items) {
      setLoading(true);
      setItems(context.items);
      setLoading(false);
    }

    if (context.generalInfo) {
      setInfo(context.generalInfo);
    }

    if (context.contactInfo) {
      setContact(context.contactInfo);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? <LoadingPage /> : ""}

      <NavBar />
      <MDBRow className="mx-0 my-5 p-0">
        <MDBCol size="12" className="p-0 my-5 contact-us_section">
          <h1>Our Products</h1>
        </MDBCol>
      </MDBRow>

      <MDBRow className="m-0 p-0" around>
        {items.map((i) => (
          <ProductCard
            md="4"
            lg="3"
            sm="10"
            key={i.id}
            imgUrl={i.imgUrl}
            itemTitle={i.name}
            itemBody={"please work loreasdfl;jksdafjsald;fjsda"}
          />
        ))}
      </MDBRow>
      <Footer
        caption1={info.caption1}
        caption2={info.caption2}
        wa={contact.phone1}
        insta={contact.instagram}
        fb={contact.facebook}
        twitter={contact.twitter}
      />
    </>
  );
};

export default ProductsPage;
