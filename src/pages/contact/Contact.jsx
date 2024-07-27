import React, { useState } from "react";
import contact from "../../assets/contact/contact.svg";
import { Link } from "react-router-dom";
import "./contact.scss";
import { FaArrowRight } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import SupportCards from "../../components/supportCards/SupportCards";
import { toast } from "react-toastify";

const BOT_TOKEN = "7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE";
const CHAT_ID = "-1002180292093";
const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `Contact Info %0AFull Name: ${fullName} %0AEmail: ${email} %0AMessage: ${message}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Message sent successfully!");
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="contact">
      <div className="contact__header container">
        <h1>
          We believe in sustainable decor. We’re passionate about life at home.
        </h1>
        <h3>
          Our features timeless furniture, with natural fabrics, curved lines,
          plenty of mirrors and classic design, which can be incorporated into
          any decor project. The pieces enchant for their sobriety, to last for
          generations, faithful to the shapes of each period, with a touch of
          the present.
        </h3>
      </div>
      <div className="contact__about container">
        <div className="contact__about__left">
          <img src={contact} alt="About Us" />
        </div>
        <div className="contact__about__right">
          <h2>About Us</h2>
          <h3>
            3legant is a gift & decorations store based in HCMC, Vietnam. Est
            since 2019. Our customer service is always prepared to support you
            24/7.
          </h3>
          <Link to="/shop">
            <p>Shop Now</p> <FaArrowRight />
          </Link>
        </div>
      </div>
      <div className="contact__contacts container">
        <h2>Contact Us</h2>
        <div className="contacts__cards">
          <div className="contact__card">
            <button>
              <CiShop />
            </button>
            <p>Address</p>
            <h3>
              234 Hai Trieu, Ho Chi Minh City, <br /> Viet Nam
            </h3>
          </div>
          <div className="contact__card">
            <button>
              <FiPhone />
            </button>
            <p>Contact Us</p>
            <h3>+84 234 567 890</h3>
          </div>
          <div className="contact__card">
            <button>
              <MdOutlineMail />
            </button>
            <p>Email</p>
            <h3>hello@3legant.com</h3>
          </div>
        </div>
        <div className="contact__form">
          <form
            onSubmit={handleSubmit}
            action=""
            className="contact__form__left"
          >
            <div className="input__group">
              <label htmlFor="fullName">FULL NAME</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="fullName"
                placeholder="Your Name"
              />
            </div>
            <div className="input__group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Your Email"
              />
            </div>
            <div className="input__group">
              <label htmlFor="message">MESSAGE</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                placeholder="Your message"
              />
            </div>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact__form__right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.0349940383453!2d69.20123767653914!3d41.28551820230703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba578f4f58d%3A0xd7a2ecf23413b7a0!2sNajot%20Ta&#39;lim%20Chilonzor%20Filial!5e1!3m2!1sen!2s!4v1721967629403!5m2!1sen!2s"
              width="600"
              height="450"
              allowFullScreen=""
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
      <SupportCards bg={"#F3F5F7"} />
    </div>
  );
};

export default Contact;
