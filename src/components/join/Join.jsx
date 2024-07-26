import React, { memo } from "react";
import "./join.scss";
import { MdOutlineMail } from "react-icons/md";

const Join = () => {
  return (
    <section className="newsletter huge__container">
      <div className="newsletter__center">
        <h2>Join Our Newsletter</h2>
        <p>Sign up for deals, new products, and promotions</p>
        <form className="newsletter__center__form">
          <button style={{ fontSize: 20 }}>
            <MdOutlineMail />
          </button>
          <input type="email" placeholder="Email address" />
          <button type="submit">Signup</button>
        </form>
      </div>
    </section>
  );
};

export default memo(Join);
