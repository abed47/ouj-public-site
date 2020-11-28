import React, { createContext, useState, useEffect } from "react";
import firebase from "../../utils/firebase/index";
export const InformationContext = createContext();

const InformationContextProvider = (props) => {
  const fs = firebase.storage();
  const fb = firebase.firestore();

  const [items, setItems] = useState([]);
  const [offers, setOffers] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [banners, setBanners] = useState([]);

  const loadData = () => {
    fb.collection("info")
      .get()
      .then(async ({ docs }) => {
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();

          if (obj && "city" in obj) {
            setContactInfo(obj);
          }

          if (obj && "caption1" in obj) {
            setGeneralInfo(obj);
          }

          if (obj && "count" in obj) {
            let arr = [];
            if (obj.count) {
              try {
                for (let i = 0; i < obj.count; i++) {
                  let url = await getImageUrl("banners", `banner${i}`);
                  arr.push(url);
                }
                setBanners(arr);
                console.log(arr);
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fb.collection("items")
      .get()
      .then(async ({ docs }) => {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();
          obj.imgUrl = await getImageUrl("items", obj.imageName);
          arr.push(obj);
        }

        setItems(arr);
      });

    fb.collection("offers")
      .get()
      .then(async ({ docs }) => {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();
          obj.imgUrl = await getImageUrl("offers", obj.imageName);
          console.log(obj.imgUrl);
          arr.push(obj);
        }

        setOffers(arr);
      });
  };

  const getImageUrl = (type, url) => {
    return new Promise((resolve, reject) => {
      fs.ref()
        .child(`/${type}/` + url + ".png")
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
    <InformationContext.Provider
      value={{
        items,
        setItems,
        contactInfo,
        setContactInfo,
        generalInfo,
        setGeneralInfo,
        banners,
        setBanners,
        offers,
        setOffers,
      }}
    >
      {props.children}
    </InformationContext.Provider>
  );
};

export default InformationContextProvider;
