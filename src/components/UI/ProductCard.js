import React from "react";
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";
import { Link } from "react-router-dom";
const ProductCard = (props) => {
  return (
    <MDBCol md={props.md} lg={props.lg} sm={props.sm} className="my-3">
      <Link to="/home">
        <MDBCard>
          <MDBCardImage className="img-fluid w-100" src={props.imgUrl} waves />
          <MDBCardBody>
            <MDBCardTitle>{props.itemTitle}</MDBCardTitle>
            <MDBCardText>{props.itemBody}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </Link>
    </MDBCol>
  );
};

export default ProductCard;
