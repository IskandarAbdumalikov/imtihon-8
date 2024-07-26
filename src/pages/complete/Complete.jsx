import React, { useEffect } from "react";
import "./complete.scss";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../../context/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  let cartData = useSelector((state) => state.cart.value);
  let method = localStorage.getItem("method");
  const totalAmount = cartData.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleComplete = () => {
    dispatch(removeAll());
    navigate("/");
  };



  useEffect(() => {
    return () => {
      console.log("/go home");
      handleComplete();
    };
  }, []);

  return (
    <div className="complete">
      <div className="complete__header">
        <h1>Complete !</h1>
        <div className="complete__steps">
          <div className="complete__step done__step">
            <span>
              <FaCheck />
            </span>
            <p>Shopping cart</p>
          </div>
          <div className="complete__step done__step">
            <span>
              <FaCheck />
            </span>
            <p>complete details</p>
          </div>
          <div className="complete__step active__step">
            <span>3</span>
            <p>Order complete</p>
          </div>
        </div>
      </div>
      <div className="complete__body">
        <h2>Thank you! 🎉</h2>
        <h1>Your order has been received</h1>
        <div className="complete__body__cards">
          {cartData?.map((product) => (
            <div key={product.id} className="complete__body__cards__card">
              <img src={product.images[0]} alt="" />
              <p>{product.amount}</p>
            </div>
          ))}
        </div>
        <ul className="complete__body__infos">
          <li>
            <p>Order code:</p>
            <h3>#0123_45678</h3>
          </li>
          <li>
            <p>Date:</p>
            <h3>July 26, 2024</h3>
          </li>
          <li>
            <p>Total:</p>
            <h3>{totalAmount}</h3>
          </li>
          <li>
            <p>Payment method:</p>
            <h3>{method}</h3>
          </li>
        </ul>
        <button onClick={handleComplete} className="complete__body__btn">
          Purchase history
        </button>
      </div>
    </div>
  );
};

export default Complete;
