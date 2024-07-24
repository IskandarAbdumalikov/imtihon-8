import React from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  let { productId } = useParams();
  return <div>SinglePage {productId}</div>;
};

export default SinglePage;
