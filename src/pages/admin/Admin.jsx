import React, { memo, useEffect } from "react";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./admin.scss";
import { useSelector } from "react-redux";

const Admin = () => {
  const isLogin = useSelector((state) => state.isLogin.value);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  return (
    <div className="admin">
      <Sidebar />
      <div>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default memo(Admin);
