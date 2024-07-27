import React, { memo } from "react";
import "./empty.scss";
import { useNavigate } from "react-router-dom";
const Empty = ({url,title}) => {
    let navigate = useNavigate()
  return <div className="container empty">
    <h2>Your {title} is empty</h2>
    <img src={url} alt="" />
    <button onClick={() => navigate("/")}>Start shopping</button>
  </div>;
};

export default memo(Empty);
