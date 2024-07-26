import React, { useState, useEffect, useRef } from "react";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import xImg from "../../assets/cart/x.svg";
import { toast } from "react-toastify";
import { RiCouponLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Empty from "../../components/empty/Empty";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [secretCode, setSecretCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const couponInputRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    calculateTotal();
  }, [cartData, discount]);

  const calculateTotal = () => {
    let subTotal = cartData.reduce((sum, b) => sum + b.price * b.amount, 0);
    let totalAmount = subTotal;

    if (discount < 1) {
      totalAmount = (subTotal * (1 - discount)).toFixed(2);
    } else {
      totalAmount = (subTotal + discount).toFixed(2);
    }

    setTotal(totalAmount);
  };

  const handleCheckout = () => {
    calculateTotal();
    navigate("/checkout");
  };

  const applyCoupon = () => {
    const code = couponInputRef.current.value.toLowerCase();
    if (code === "laylo") {
      setDiscount(0.4);
      toast.success("Coupon applied! 40% discount added.");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  if (cartData.length === 0) {
    return (
      <Empty
        url={"https://cdn-icons-png.flaticon.com/512/11329/11329060.png"}
        title={"Cart"}
      />
    );
  }

  return (
    <div className="cart container">
      <div className="cart__header">
        <h1>Cart</h1>
        <div className="cart__steps">
          <div className="cart__step active__step">
            <span>1</span>
            <p>Shopping cart</p>
          </div>
          <div className="cart__step">
            <span>2</span>
            <p>Checkout details</p>
          </div>
          <div className="cart__step">
            <span>3</span>
            <p>Order complete</p>
          </div>
        </div>
      </div>
      <div className="cart__body">
        <div className="cart__body__left">
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.map((product) => (
                <tr key={product.id}>
                  <td className="cart-product__info">
                    <img className="main__img" src={product.images[0]} alt="" />
                    <div className="cart__body__left__info">
                      <h3 title={product.title}>{product.title}</h3>
                      <button
                        onClick={() => dispatch(remove(product))}
                        className="remove-btn"
                      >
                        <img src={xImg} alt="" /> Remove
                      </button>
                    </div>
                  </td>
                  <td className="">
                    <div className="cart__counter-btns">
                      <button
                        disabled={product.amount === 1}
                        onClick={() => dispatch(decreaseAmount(product))}
                      >
                        -
                      </button>
                      <span className="text-2xl">{product.amount}</span>
                      <button
                        disabled={product.amount === product.stock}
                        onClick={() => dispatch(increaseAmount(product))}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p>${product.price.toFixed(2)}</p>
                  </td>
                  <td>
                    <p>${(product.price * product.amount).toFixed(2)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart__body__right">
          <div className="cart__body__right__summary-card">
            <h2>Cart Summary</h2>
            <div className="cart__labels">
              <label htmlFor="free-shipping">
                <input
                  name="type"
                  onChange={() => setDiscount(0)}
                  value={0}
                  type="radio"
                  id="free-shipping"
                />
                <h3>Free shipping</h3>
                <p>$0.00</p>
              </label>
              <label htmlFor="express-shipping">
                <input
                  name="type"
                  onChange={() => setDiscount(15)}
                  value={15}
                  type="radio"
                  id="express-shipping"
                />
                <h3>Express shipping</h3>
                <p>+$15.00</p>
              </label>
              <label htmlFor="pick-up">
                <input
                  name="type"
                  onChange={() => setDiscount(0.21)}
                  value={0.21}
                  type="radio"
                  id="pick-up"
                />
                <h3>Pick up</h3>
                <p>%21.00</p>
              </label>
            </div>
            <div className="subtotal">
              <h3>Subtotal</h3>
              <p>
                $
                {cartData
                  .reduce((sum, b) => sum + b.price * b.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="total">
              <h3>Total</h3>
              <p>${total}</p>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
      <div className="cart__footer">
        <h2>Have a coupon?</h2>
        <p>Add your code for an instant cart discount</p>
        <form action="">
          <RiCouponLine />
          <input
            type="text"
            placeholder="Enter coupon code"
            ref={couponInputRef}
          />
          <button type="button" onClick={applyCoupon}>
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
