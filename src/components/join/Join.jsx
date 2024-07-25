import React, { memo } from "react";
import "./join.scss";

const Join = () => {
  return (
    <section className="newsletter huge__container">
      <div className="newsletter__left"></div>
      <div className="newsletter__center">
        <h2>Join Our Newsletter</h2>
        <p>Sign up for deals, new products, and promotions</p>
        <form className="newsletter__form">
          <input type="email" placeholder="Email address" />
          <button type="submit">Signup</button>
        </form>
      </div>
      <div className="newsletter__right"></div>
    </section>
  );
};

export default memo(Join);
