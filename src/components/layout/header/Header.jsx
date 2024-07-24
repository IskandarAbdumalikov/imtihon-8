import React, { useState } from "react";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";
import headerTop from "../../../assets/header/headerTop.svg";
import logo from "../../../assets/header/logo.svg";
import { CiSearch } from "react-icons/ci";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import HeaderSearchModule from "./HeaderSearchModule";

const Header = () => {
  const [showSearchModule, setShowSearchModule] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHeaderTop, setShowHeaderTop] = useState(true);
  return (
    <header className="header">
      {showHeaderTop ? (
        <div className="header__top">
          <div className="container">
            <img width={24} height={24} src={headerTop} alt="" />
            <p>30% off storewide — Limited time! </p>
            <Link>Shop Now</Link>
          </div>
          <button onClick={() => setShowHeaderTop(false)}>x</button>
        </div>
      ) : (
        <></>
      )}
      <nav className="header__bottom container">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <ul>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/shop"}>Shop</NavLink>
          <NavLink to={"/blog"}>Blog</NavLink>
          <NavLink to={"/contact"}>Contact us</NavLink>
        </ul>
        <div className="header__bottom__btns">
          <button onClick={() => setShowSearchModule(true)}>
            <CiSearch />
          </button>
          <button>
            <FaUser />
          </button>
          <button>
            <FaCartArrowDown />
          </button>
        </div>
      </nav>
      <HeaderSearchModule
        setShowSearchModule={setShowSearchModule}
        showSearchModule={showSearchModule}
        logo={logo}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {showSearchModule ? (
        <div
          onClick={() => setShowSearchModule(false)}
          className="transparent__overlay"
        ></div>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
