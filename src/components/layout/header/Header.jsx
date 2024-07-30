import React, { memo, useEffect, useState } from "react";
import "./header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import headerTop from "../../../assets/header/headerTop.svg";
import logo from "../../../assets/header/logo.svg";
import { CiHeart, CiSearch } from "react-icons/ci";
import {
  FaCartArrowDown,
  FaRegHeart,
  FaRegUserCircle,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import HeaderSearchModule from "./HeaderSearchModule";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import SearchResults from "./SearchResults";
import { useGetProductsBySearchQuery } from "../../../context/api/productApi";
import { FiShoppingBag } from "react-icons/fi";
import xImg from "../../../assets/cart/x.svg";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";

const Header = () => {
  const [showSearchModule, setShowSearchModule] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHeaderTop, setShowHeaderTop] = useState(true);
  const [addClassName, setAddClassName] = useState(false);
  const [showList, setShowList] = useState(false);
  const { data, isError } = useGetProductsBySearchQuery({
    title: searchValue.trim(),
  });
  const isLogin = useSelector((state) => state.isLogin.value);
  const cartData = useSelector((state) => state.cart.value);
  const wishlistData = useSelector((state) => state.wishlist.value);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setAddClassName(true);
      } else {
        setAddClassName(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="header">
        {showHeaderTop ? (
          <div className="header__top">
            <div className="container">
              <img width={24} height={24} src={headerTop} alt="" />
              <p>30% off storewide — Limited time!</p>
              <Link>Shop Now</Link>
            </div>
            <button onClick={() => setShowHeaderTop(false)}>
              <img src={xImg} alt="" />
            </button>
          </div>
        ) : null}
        <nav className={`${addClassName ? "sticky" : ""}`}>
          <div className="container header__bottom ">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
            <ul>
              <NavLink onClick={() => setShowList(false)} to={"/"}>
                Home
              </NavLink>
              <NavLink onClick={() => setShowList(false)} to={"/shop"}>
                Shop
              </NavLink>
              <NavLink onClick={() => setShowList(false)} to={"/blog"}>
                Blog
              </NavLink>
              <NavLink onClick={() => setShowList(false)} to={"/contact"}>
                Contact us
              </NavLink>
            </ul>

            <div className="header__bottom__btns">
              <button className="menu-btn" onClick={() => setShowList(true)}>
                <IoMdMenu />
              </button>
              <button
                className="search__btn__noner"
                onClick={() => setShowSearchModule(true)}
              >
                <IoSearchSharp />
              </button>
              <Link
                onClick={() => setShowList(false)}
                to={isLogin ? "/admin/productManage" : "/login"}
              >
                <button>
                  <FaRegUserCircle />
                </button>
              </Link>
              <Link onClick={() => setShowList(false)} to={"/cart"}>
                <button className="with__sup">
                  <FiShoppingBag />
                  <sup>{cartData?.length ? cartData?.length : 0}</sup>
                </button>
              </Link>
              <Link onClick={() => setShowList(false)} to={"/wishlist"}>
                <button className="with__sup">
                  <FaRegHeart />
                  <sup>{wishlistData?.length ? wishlistData?.length : 0}</sup>
                </button>
              </Link>
            </div>
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
        ) : null}
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
            <IoSearchSharp />
            <input
              autoFocus
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              type="text"
            />
            {searchValue.trim() ? (
              <MdCancel onClick={() => setSearchValue("")} />
            ) : null}
            {searchValue ? (
              <SearchResults
                data={data}
                handleClose={() => setShowList(false)}
                isError={isError}
              />
            ) : null}
          </form>

          <li>
            <NavLink onClick={() => setShowList(false)} to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => setShowList(false)} to={"/shop"}>
              Shop
            </NavLink>
            <IoIosArrowDown />
          </li>
          <li>
            <NavLink onClick={() => setShowList(false)} to={"/blog"}>
              Blog
            </NavLink>
            <IoIosArrowDown />
          </li>
          <li>
            <NavLink onClick={() => setShowList(false)} to={"/contact"}>
              Contact Us
            </NavLink>
          </li>
        </div>
        <div className="header-media__bottom">
          <NavLink onClick={() => setShowList(false)} to={"/cart"}>
            <li>
              <a href="">Cart</a>
              <LuShoppingBag />
            </li>
          </NavLink>
          <NavLink onClick={() => setShowList(false)} to={"/wishlist"}>
            <li>
              <a href="">Wishlist</a>
              <FaRegHeart />
            </li>
          </NavLink>
          <Link to={isLogin ? "/admin/productManage" : "/login"}>
            <button>Sign in</button>
          </Link>
        </div>
      </header>
      {showList ? (
        <div onClick={() => setShowList(false)} className="overlay"></div>
      ) : null}
    </>
  );
};

export default memo(Header);
