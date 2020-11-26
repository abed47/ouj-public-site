import React, { useState, useEffect } from "react";
import NavBar from "./UI/NavBar";
import Footer from "./UI/Footer";
import { MDBRow, MDBCol } from "mdbreact";
import ContactUsBG from "../assets/images/aboutus-bg.png";
import LoadingPage from "./UI/LoadingPage";
import firebase from "../utils/firebase";
import ProductCard from "./UI/ProductCard";
const ProductsPage = (props) => {
  const itemsRef = firebase.firestore().collection("items");
  const fs = firebase.storage();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  let temp = [];

  const loadData = () => {
    setLoading(true);
    let itemsHolder = [];
    itemsRef
      .get()
      .then(async ({ docs }) => {
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();
          await obj;
          console.log(obj);
          obj.image = await getImageUrl(obj.imageName);
          itemsHolder.push(obj);
        }

        setItems(itemsHolder);
        console.log(itemsHolder);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImageUrl = (v) => {
    return new Promise((resolve, reject) => {
      fs.ref()
        .child("items/" + v + ".png")
        .getDownloadURL()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? <LoadingPage /> : ""}

      <NavBar />
      <MDBRow className="m-0 p-0">
        <MDBCol size="12" className="p-0 contact-us_hero">
          <img src={ContactUsBG} alt="" />
        </MDBCol>

        <MDBCol size="12" className="p-0 contact-us_section">
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
            imgUrl={i.image}
            itemTitle={i.name}
            itemBody={"please work loreasdfl;jksdafjsald;fjsda"}
          />
        ))}
      </MDBRow>
      <Footer />
    </>
  );
};

export default ProductsPage;
