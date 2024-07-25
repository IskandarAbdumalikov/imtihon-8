import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import { useGetProductByIdQuery } from "../../context/api/productApi";
import star from "../../assets/products/star.svg";
import halfStar from "../../assets/products/starHalf.svg";
import starRegular from "../../assets/products/starRegular.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import CommentModal from "./CommentModal";
import {
  useCreateUserMutation,
  useGetUsersQuery,
} from "../../context/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  increaseAmount,
  decreaseAmount,
} from "../../context/slices/cartSlice";
import { CiHeart } from "react-icons/ci";
import Join from "../../components/join/Join";

const SinglePage = () => {
  const { productId } = useParams();
  const { data: singleData,isFetching,isLoading } = useGetProductByIdQuery(productId);
  const { data: userData } = useGetUsersQuery();
  const [createComment] = useCreateUserMutation();

  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartData = useSelector((state) => state.cart.value);
  const selectedData = cartData.find(
    (product) => product.id === singleData?.id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const getRating = (rating) => {
    let res = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      res.push(<img src={star} alt="" key={`star-${i}`} />);
    }
    if (rating % 1 > 0.4) {
      res.push(<img src={halfStar} alt="" key="half-star" />);
    }
    for (let i = Math.round(rating); i < 5; i++) {
      res.push(<img src={starRegular} alt="" key={`star-regular-${i}`} />);
    }
    return res;
  };

  if (isFetching || isLoading) {
    return (
      <div className="single__loading container">
        <div className="single__loading__left bg__animation"></div>
        <div className="single__loading__right">
          <div className="single__loading__right__item bg__animation"></div>
          <div className="single__loading__right__item bg__animation"></div>
          <div className="single__loading__right__item bg__animation"></div>
        </div>
      </div>
    );
  }

  const { title, description, price, oldPrice, rating, images, category } =
    singleData;

  return (
    <div className="single__page">
      <div className="single__page__top container">
        <div className="single__page__top__left">
          <div className="single__page__top__left__image">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={mainImage ? images[+mainImage] : image}
                    alt="Main Product"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="single__page__top__left__images">
            {images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={index === mainImage ? "active" : ""}
                onClick={() => setMainImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="single__page__top__right">
          <div className="rating">{getRating(rating)}</div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="prices">
            <h3>${price}</h3>
            {oldPrice && <h2>${oldPrice}</h2>}
          </div>
          <div style={{flexWrap:'wrap'}} className="cart-btn">
            {selectedData ? (
              <div className="counter-btns">
                {selectedData.amount === 1 ? (
                  <button onClick={() => dispatch(remove(selectedData))}>
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch(decreaseAmount(selectedData))}
                  >
                    -
                  </button>
                )}
                <span>{selectedData.amount}</span>
                <button onClick={() => dispatch(increaseAmount(selectedData))}>
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(add(singleData))}
                className="single__add-to-cart-btn"
              >
                + add to cart
              </button>
            )}
            <button className="single__wishlist-btn">
              <CiHeart /> Wishlist
            </button>
          </div>
          <p style={{paddingTop:30}}>CATEGORY:     {category}</p>
        </div>
      </div>
      <div className="single__page__bottom container">
        <div className="reviews">
          <h2>Customer Reviews</h2>
          <button onClick={() => setIsModalOpen(true)}>Write review</button>
          <div className="review__cards">
            {userData?.map((user, index) => (
              <div className="review__card" key={index}>
                <div className="review__card__image">
                  <img
                    src={
                      "https://s3-alpha-sig.figma.com/img/2d68/b448/ac71ffb74b99039b69fca7eb2adeecf4?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DpSi56EH1mIa1D2ElIr6fkkFbaW9Lk3yKo9XMW05yrV0yCT7ASdB0bVbFMoqEkDiw7RJa6~g~Rvg0sj5Fe0JruaDobVdr3Ql4IWGvdKcRuF3iVleLTsKZ875c5TSKUyIFlRQevHr369h~luAyi5EdDLbuHXLscKAGWJVt6CHNWFL-2o~S5Pt3cuqmwzei4zAnp0dN8Rmq0gh9NH76BuB7jeo-oEOkH1E97Jrdyl98CffhfurLtCEurlW~~nJNNkJS9a3Fqur7orB0W5HGnYbb0Pc980SEB1aNfBiFvzAxNSUzDI9bKzK~-nyO0WGhCBjsH-rmASPAxcjDSWQJBgWFg__"
                    }
                    alt=""
                  />
                </div>
                <div className="review__card__info">
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="rating__comment">
                    {getRating(user.commentRating)}
                  </div>
                  <p>{user.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Join/>
      <CommentModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={createComment}
      />
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="overlay"></div>
      )}
    </div>
  );
};

export default SinglePage;
