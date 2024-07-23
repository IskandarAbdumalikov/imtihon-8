import React from "react";
import star from "../../assets/products/star.svg";
import halfStar from "../../assets/products/starHalf.svg";
import starRegular from "../../assets/products/starRegular.svg";
import { Link } from "react-router-dom";
import shipping from "../../assets/products/shipping.svg";
import secure from "../../assets/products/secure.svg";
import phone from "../../assets/products/phone.svg";
import money from "../../assets/products/money.svg";
import "./products.scss";
import Loading from "../loading/Loading";

const Products = ({ data, isLoading, isFetching }) => {
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
        {isFetching && isFetching ? <Loading /> : <></>}
        {data?.slice(0, 8)?.map((product) => (
          <div className="product__card" key={product.id}>
            <div className="product__card__image">
              <button className="add-to-cart__btn">Add to cart</button>
              <img src={product?.images[0]} alt={product?.title} />
            </div>
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
      <div className="products__bottom__cards">
        <div className="products__bottom__card">
          <img src={shipping} alt="" />
          <h3>Free Shipping</h3>
          <p>Order above $200</p>
        </div>
        <div className="products__bottom__card">
          <img src={secure} alt="" />
          <h3>Secure Payments</h3>
          <p>30 days guarantee</p>
        </div>
        <div className="products__bottom__card">
          <img src={phone} alt="" />
          <h3>24/7 Support</h3>
          <p>Secured by Stripe</p>
        </div>
        <div className="products__bottom__card">
          <img src={money} alt="" />
          <h3>Money-back</h3>
          <p>Phone and Email support</p>
        </div>
      </div>
    </section>
  );
};

export default Products;
