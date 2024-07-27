import React, { memo } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../context/slices/loginSlice";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin.value);
  let handleLogOut = () => {
    dispatch(login(false));
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link to={"/"}>
          <FaArrowAltCircleLeft />
        </Link>
        <span>Dashboard</span>
      </h2>
      <ul className="sidebar__collection">
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/productCreate") ? "active" : ""
            }`}
            to={"/admin/productCreate"}
          >
            <IoCreateOutline />
            <span>Create Product</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/productManage") ? "active" : ""
            }`}
            to={"/admin/productManage"}
          >
            <AiOutlineProduct />
            <span>Manage Product</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/categoryCreate") ? "active" : ""
            }`}
            to={"/admin/categoryCreate"}
          >
            <IoCreateOutline />
            <span>Create Category</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__link ${
              isActive("/admin/categoryManage") ? "active" : ""
            }`}
            to={"/admin/categoryManage"}
          >
            <AiOutlineProduct />
            <span>Manage Category</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            className={`sidebar__home sidebar__link text-nowrap ${
              isActive("/") ? "active" : ""
            }`}
            to={"/"}
          >
            <FaArrowAltCircleLeft />
            <span>Home</span>
          </Link>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__home sidebar__link" onClick={handleLogOut}>
            <RiLogoutBoxLine />
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);
