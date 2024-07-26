import React from "react";
import "./hero.scss";

const Hero = ({ title, subtitle, route, bg }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="common__hero container"
    >
      <div className="hero__route">
        <p>home</p>
        <span>{">"}</span>
        <h3>{route}</h3>
      </div>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
};

export default Hero;
