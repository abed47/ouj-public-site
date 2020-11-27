import React, { createContext, useState, useEffect } from "react";
import firebase from "../../utils/firebase/index";
export const InformationContext = createContext();

const InformationContextProvider = (props) => {
  const fs = firebase.storage();
  const fb = firebase.firestore();

  const [items, setItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});

  const loadData = () => {
    fb.collection("info")
      .get()
      .then(({ docs }) => {
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();

          if (obj && "city" in obj) {
            setContactInfo(obj);
          }

          if (obj && "caption1" in obj) {
            setGeneralInfo(obj);
          }
        }
      });

    fb.collection("items")
      .get()
      .then(async ({ docs }) => {
        let arr = [];
        for (let i = 0; i < docs.length; i++) {
          let obj = docs[i].data();
          obj.imgUrl = await getImageUrl(obj.imageName);
          arr.push(obj);
        }

        setItems(arr);
      });
  };

  const getImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      fs.ref()
        .child("/items/" + url + ".png")
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
    console.log("data loaded");
  }, []);
  return (
    <InformationContext.Provider
      value={{ items, setItems, contactInfo, setContactInfo, generalInfo, setGeneralInfo }}
    >
      {props.children}
    </InformationContext.Provider>
  );
};

export default InformationContextProvider;
