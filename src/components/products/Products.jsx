import React, { useState } from "react";
import star from "../../assets/products/star.svg";
import halfStar from "../../assets/products/starHalf.svg";
import starRegular from "../../assets/products/starRegular.svg";

import "./products.scss";
import Loading from "../loading/Loading";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";

const Products = ({ data, isLoading, isFetching, setLimit, limit }) => {
  const getRating = (rating) => {
    let res = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      res.push(<img src={star} alt="" />);
    }
    if (rating % 1 > 0.4) {
      res.push(<img src={halfStar} alt="" />);
    }
    for (let i = Math.round(rating); i < 5; i++) {
      res.push(<img src={starRegular} alt="" />);
    }
    return res;
  };

  return (
    <section className="products">
      <div className="products__card">
        {isLoading || isFetching ? <Loading /> : <></>}
        {data?.map((product) => (
          <div className="product__card" key={product.id}>
            <Link
              to={`/products/${product.id}`}
              className="product__card__image"
            >
              <button className="add-to-cart__btn">Add to cart</button>
              <img src={product?.images[0]} alt={product?.title} />
            </Link>
            <div className="product__card__info">
              <div className="rating">{getRating(product?.rating)}</div>
              <p>{product?.title}</p>
              <div className="price">
                <p>${product?.price}</p>
                <p>${product?.oldPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50 }} className="products__card__pagination">
        <FormControl style={{ maxWidth: 200 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Limit"
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={32}>32</MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
};

export default Products;
