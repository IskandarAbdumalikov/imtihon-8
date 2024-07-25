import React, { useState } from "react";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";
import headerTop from "../../../assets/header/headerTop.svg";
import logo from "../../../assets/header/logo.svg";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaCartArrowDown, FaRegHeart, FaRegUserCircle, FaUser } from "react-icons/fa";
import HeaderSearchModule from "./HeaderSearchModule";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import SearchResults from "./SearchResults";
import { useGetProductsBySearchQuery } from "../../../context/api/productApi";
import { FiShoppingBag } from "react-icons/fi";

const Header = () => {
  const [showSearchModule, setShowSearchModule] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHeaderTop, setShowHeaderTop] = useState(true);
  const [showList, setShowList] = useState(false);
  let { data, isError } = useGetProductsBySearchQuery({
    title: searchValue.trim(),
  });
  return (
    <>
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
            <button className="menu-btn" onClick={() => setShowList(true)}>
              <IoMdMenu />
            </button>
            <button onClick={() => setShowSearchModule(true)}>
              <CiSearch />
            </button>
            <Link to={"/admin"}>
              <button>
                <FaRegUserCircle />
              </button>
            </Link>
            <Link to={"/cart"}>
              <button>
                <FiShoppingBag />
              </button>
            </Link>
            <Link to={"/wishlist"}>
              <button>
                <FaRegHeart />
              </button>
            </Link>
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
      <header
        className={
          showList ? "header-media show__header-media" : "header-media"
        }
      >
        <div className="header-media__top">
          <div className="header-media__top__logo">
            <img src={logo} alt="" />
            <button onClick={() => setShowList(false)}>x</button>
          </div>
          <form className="header-media__top-form">
            <CiSearch />
            <input
              autoFocus
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
            />
            {searchValue.trim() ? (
              <MdCancel onClick={() => setSearchValue("")} />
            ) : (
              <></>
            )}
            {searchValue ? (
              <SearchResults
                data={data}
                handleClose={() => setShowList(false)}
                isError={isError}
              />
            ) : (
              <></>
            )}
          </form>

          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/shop"}>Shop</NavLink>
            <IoIosArrowDown />
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
            <IoIosArrowDown />
          </li>
          <li>
            <NavLink to={"/contact"}>Contact Us</NavLink>
          </li>
        </div>
        <div className="header-media__bottom">
          <li>
            <NavLink to={"/cart"}>Cart</NavLink>
            <LuShoppingBag />
          </li>
          <li>
            <NavLink to={"/wishlist"}>Wishlist</NavLink>
            <FaRegHeart />
          </li>
          <button>Sign in</button>
        </div>
      </header>
      {showList ? (
        <div onClick={() => setShowList(false)} className="overlay"></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
