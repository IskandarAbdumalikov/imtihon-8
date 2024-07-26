import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import {
  useGetProductByIdQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
} from "../../context/api/productApi";
import star from "../../assets/products/star.svg";
import halfStar from "../../assets/products/starHalf.svg";
import starRegular from "../../assets/products/starRegular.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import CommentModal from "./CommentModal";
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
  const {
    data: singleData,
    isFetching,
    isLoading,
  } = useGetProductByIdQuery(productId);
  const { data: commentsData, refetch } = useGetCommentsQuery(productId);
  const [addComment] = useAddCommentMutation();

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

  const handleAddComment = async (commentData) => {
    await addComment({ id: productId, body: commentData });
    setIsModalOpen(false);
    refetch(); // Refetch comments after adding a new one
  };

  return (
    <div className="single__page">
      <div className="single__page__top container">
        <div className="single__page__top__left">
          <div className="single__page__top__left__image">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {singleData?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={mainImage ? singleData?.images[+mainImage] : image}
                    alt="Main Product"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="single__page__top__left__images">
            {singleData?.images?.map((image, index) => (
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
          <div className="rating">{getRating(singleData?.rating)}</div>
          <h1>{singleData?.title}</h1>
          <p>{singleData?.description}</p>
          <div className="prices">
            <h3>${singleData?.price}</h3>
            {singleData?.oldPrice && <h2>${singleData?.oldPrice}</h2>}
          </div>
          <div style={{ flexWrap: "wrap" }} className="cart-btn">
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
          <p style={{ paddingTop: 30 }}>CATEGORY: {singleData?.category}</p>
        </div>
      </div>
      <div className="single__page__bottom container">
        <div className="reviews">
          <h2>Customer Reviews</h2>
          <button onClick={() => setIsModalOpen(true)}>Write review</button>
          <div className="review__cards">
            {commentsData?.comments?.map((comment, index) => (
              <div className="review__card" key={index}>
                <div className="review__card__image">
                  <img
                    src={
                      "https://s3-alpha-sig.figma.com/img/2d68/b448/ac71ffb74b99039b69fca7eb2adeecf4?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DpSi56EH1mIa1D2ElIr6fkkFbaW9Lk3yKo9XMW05yrV0yCT7ASdB0bVbFMoqEkDiw7RJa6~g~Rvg0sj5Fe0JruaDobVdr3Ql4IWGvdKcRuF3iVleLTsKZ875c5TSKUyIFlRQevHr369h~luAyi5EdDLbuHXLscKAGWJVt6CHNWFL-2o~S5Pt3cuqmwzei4zAnp0dN8Rmq0gh9NH76BuB7jeo-oEOkH1E97Jrdyl98CffhfurLtCEurlW~~nJNNkJS9a3Fqur7orB0W5HGnYbb0Pc980SEB1aNfBiFvzAxNSUzDI9bKzK~-nyO0WGhCBjsH-rmASPAxcjDSWQJBgWFg__"
                    }
                    alt="User"
                  />
                </div>
                <div className="review__card__info">
                  <h3>{comment.user}</h3>
                  <div className="rating__comment">
                    {getRating(comment.rating)}
                  </div>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: 50, marginBottom: -50 }}
        className="single__join"
      >
        <Join />
      </div>
      <CommentModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
};

export default SinglePage;
