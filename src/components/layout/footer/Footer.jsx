import React from "react";
import "./footer.scss";
import logo from "../../../assets/footer/footerLogo.svg";
import { Link } from "react-router-dom";
import instagram from "../../../assets/footer/instagram.svg";
import facebook from "../../../assets/footer/facebook.svg";
import youtube from "../../../assets/footer/youtube.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__top__left">
          <img src={logo} alt="" />
          <p>Gift & Decoration Store</p>
        </div>
        <div className="footer__top__right">
          <ul>
            <Link>Home</Link>
            <Link>Shop</Link>
            <Link>Products</Link>
            <Link>Blog</Link>
            <Link>Contact Us</Link>
          </ul>
        </div>
      </div>
      <div className="footer__bottom container">
        <div className="footer__bottom__left">
          <p>Copyright © 2023 3legant. All rights reserved</p>
          <p>Privacy Policy</p>
          <p>Terms of use</p>
        </div>
        <div className="footer__bottom__right">
          <ul>
            <a target="_blank" href="https://www.instagram.com">
              <img src={instagram} alt="" />
            </a>
            <a target="_blank" href="https://www.facebook.com">
              <img src={facebook} alt="" />
            </a>
            <a target="_blank" href="https://www.youtube.com/">
              <img src={youtube} alt="" />
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
