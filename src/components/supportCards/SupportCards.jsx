import React from "react";
import "./support.scss";
import shipping from "../../assets/products/shipping.svg";
import secure from "../../assets/products/secure.svg";
import phone from "../../assets/products/phone.svg";
import money from "../../assets/products/money.svg";

const SupportCards = ({ bg }) => {
  return (
    <div style={{ backgroundColor: bg }}>
      <div className="products__bottom__cards container">
        <div className="products__bottom__card">
          <img src={shipping} alt="Free Shipping" />
          <h3>Free Shipping</h3>
          <p>Order above $200</p>
        </div>
        <div className="products__bottom__card">
          <img src={secure} alt="Secure Payments" />
          <h3>Secure Payments</h3>
          <p>30 days guarantee</p>
        </div>
        <div className="products__bottom__card">
          <img src={phone} alt="24/7 Support" />
          <h3>24/7 Support</h3>
          <p>Secured by Stripe</p>
        </div>
        <div className="products__bottom__card">
          <img src={money} alt="Money-back" />
          <h3>Money-back</h3>
          <p>Phone and Email support</p>
        </div>
      </div>
    </div>
  );
};

export default SupportCards;
