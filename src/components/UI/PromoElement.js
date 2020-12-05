import React from "react";
import { MDBCol } from "mdbreact";

const Promo = (props) => {
  if (props.direction === "left") {
    return (
      <>
        <MDBCol size="6" className="m-0 p-0">
          <div className="promo-container_image">
            <img src={props.imgUrl} alt="" />
          </div>
        </MDBCol>
        <MDBCol size="6" className="m-0 p-0">
          <div className="promo-container_description">
            <h2 className="_title">{props.title}</h2>
            <p className="_description mt-2" dangerouslySetInnerHTML={{ __html: props.description }}></p>
          </div>
        </MDBCol>
      </>
    );
  }

  return (
    <>
      <MDBCol size="6" className="m-0 p-0">
        <div className="promo-container_description">
          <h2 className="_title">{props.title}</h2>
          <p className="_description mt-2" dangerouslySetInnerHTML={{ __html: props.description }}></p>
        </div>
      </MDBCol>
      <MDBCol size="6" className="m-0 p-0">
        <div className="promo-container_image">
          <img src={props.imgUrl} alt="" />
        </div>
      </MDBCol>
    </>
  );
};

export default Promo;
