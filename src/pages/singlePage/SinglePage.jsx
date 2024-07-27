import React, { memo, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  add,
  remove,
  increaseAmount,
  decreaseAmount,
} from "../../context/slices/cartSlice";
import { CiHeart } from "react-icons/ci";
import Join from "../../components/join/Join";
import { FaHeart, FaPenNib, FaRegHeart } from "react-icons/fa";
import { toggleHeart } from "../../context/slices/wishlistSlice";

const SinglePage = () => {
  const { productId } = useParams();
  const {
    data: singleData,
    isFetching,
    isLoading,
  } = useGetProductByIdQuery(productId);

  const [mainImage, setMainImage] = useState("");
  const [abTab, setAbTab] = useState(3);

  const cartData = useSelector((state) => state.cart.value);
  const selectedData = cartData.find(
    (product) => product.id === singleData?.id
  );

  console.log(singleData);

  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist.value);

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
            <button
              onClick={() => dispatch(toggleHeart(singleData))}
              className="single__wishlist-btn"
            >
              {wishlistData.some((el) => el.id === singleData.id) ? (
                <FaHeart color="crimson" />
              ) : (
                <FaRegHeart />
              )}{" "}
              Wishlist
            </button>
          </div>
          <p style={{ paddingTop: 30 }}>CATEGORY: {singleData?.category}</p>
        </div>
      </div>
      <div className="single__page__bottom container">
        <div className="abTab">
          <div className="abTab__header">
            <p
              onClick={() => setAbTab(1)}
              className={abTab === 1 ? "active" : ""}
            >
              Additional Information
            </p>
            <p
              onClick={() => setAbTab(2)}
              className={abTab === 2 ? "active" : ""}
            >
              Questions
            </p>
            <p
              onClick={() => setAbTab(3)}
              className={abTab === 3 ? "active" : ""}
            >
              Reviews
            </p>
          </div>
        </div>
        {abTab == 3 ? (
          <div className="reviews">
            <h2>Customer Reviews</h2>
            <form className="reviews__header">
              <input type="text" />
              <button className="review-btn">Write review</button>
              <button className="review-btn-media">
                <FaPenNib />
              </button>
            </form>
            <div className="reviews__cards">
              <h2>3 reviews</h2>

              <div className="review__card">
                <div className="review__card__left">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/fbee/bffb/ad67ac62a1529eb723526726093127ba?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kv00FZkIGFXur4E0~t1lINK5CvzKS4v-5XhB2ui5SFRKXnKJkNK49VSDOAHUpcq2y0h4FduL55I5o6buXkKXHgut4Uyql7-1aWG33TLEClfGXVeO5w3k0dWXBySjgG3s8Cem1cn4J2jbDczs11tRr0NBUKHZWRX7N3-Sne3OOMx6aSe2rWvpfYXpxnsS1a8OJ9rk4j4vU2peC91pqwEr-4tj-opWnXuOib8B6CZslnHQr6RnZ7BfLT3ozcKCVv8kP830eXyFGHe3T2Ik60IRKV9nwQG5G6FzCaYLE-osTFOdGB8tJyVF41Oiuip0SCOJJtQClFpBHw0oT64qEF0HZQ__"
                    alt=""
                  />
                </div>
                <div className="review__card__right">
                  <h3 className="review__card__right__name">Sofia Harvetz</h3>
                  <div className=" rating__none">{getRating(5)}</div>
                  <div className="review__card__right__media">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/fbee/bffb/ad67ac62a1529eb723526726093127ba?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kv00FZkIGFXur4E0~t1lINK5CvzKS4v-5XhB2ui5SFRKXnKJkNK49VSDOAHUpcq2y0h4FduL55I5o6buXkKXHgut4Uyql7-1aWG33TLEClfGXVeO5w3k0dWXBySjgG3s8Cem1cn4J2jbDczs11tRr0NBUKHZWRX7N3-Sne3OOMx6aSe2rWvpfYXpxnsS1a8OJ9rk4j4vU2peC91pqwEr-4tj-opWnXuOib8B6CZslnHQr6RnZ7BfLT3ozcKCVv8kP830eXyFGHe3T2Ik60IRKV9nwQG5G6FzCaYLE-osTFOdGB8tJyVF41Oiuip0SCOJJtQClFpBHw0oT64qEF0HZQ__"
                      alt=""
                    />
                    <div>
                      <h3>Sofia Harvetz</h3>
                      <div className="rating">{getRating(5)}</div>
                    </div>
                  </div>
                  <p>
                    I bought it 3 weeks ago and now come back just to say
                    “Awesome Product”. I really enjoy it. At vero eos et
                    accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupt et quas
                    molestias excepturi sint non provident.
                  </p>
                </div>
              </div>
              <div className="review__card">
                <div className="review__card__left">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/2d68/b448/ac71ffb74b99039b69fca7eb2adeecf4?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DpSi56EH1mIa1D2ElIr6fkkFbaW9Lk3yKo9XMW05yrV0yCT7ASdB0bVbFMoqEkDiw7RJa6~g~Rvg0sj5Fe0JruaDobVdr3Ql4IWGvdKcRuF3iVleLTsKZ875c5TSKUyIFlRQevHr369h~luAyi5EdDLbuHXLscKAGWJVt6CHNWFL-2o~S5Pt3cuqmwzei4zAnp0dN8Rmq0gh9NH76BuB7jeo-oEOkH1E97Jrdyl98CffhfurLtCEurlW~~nJNNkJS9a3Fqur7orB0W5HGnYbb0Pc980SEB1aNfBiFvzAxNSUzDI9bKzK~-nyO0WGhCBjsH-rmASPAxcjDSWQJBgWFg__"
                    alt=""
                  />
                </div>
                <div className="review__card__right">
                  <h3 className="review__card__right__name">Nicolas Jensen</h3>
                  <div className=" rating__none">{getRating(3.5)}</div>
                  <div className="review__card__right__media">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/2d68/b448/ac71ffb74b99039b69fca7eb2adeecf4?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DpSi56EH1mIa1D2ElIr6fkkFbaW9Lk3yKo9XMW05yrV0yCT7ASdB0bVbFMoqEkDiw7RJa6~g~Rvg0sj5Fe0JruaDobVdr3Ql4IWGvdKcRuF3iVleLTsKZ875c5TSKUyIFlRQevHr369h~luAyi5EdDLbuHXLscKAGWJVt6CHNWFL-2o~S5Pt3cuqmwzei4zAnp0dN8Rmq0gh9NH76BuB7jeo-oEOkH1E97Jrdyl98CffhfurLtCEurlW~~nJNNkJS9a3Fqur7orB0W5HGnYbb0Pc980SEB1aNfBiFvzAxNSUzDI9bKzK~-nyO0WGhCBjsH-rmASPAxcjDSWQJBgWFg__"
                      alt=""
                    />
                    <div>
                      <h3>Nicolas Jensen</h3>
                      <div className="rating">{getRating(3.5)}</div>
                    </div>
                  </div>
                  <p>
                    I bought it 3 weeks ago and now come back just to say
                    “Awesome Product”. I really enjoy it. At vero eos et
                    accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupt et quas
                    molestias excepturi sint non provident.
                  </p>
                </div>
              </div>
              <div className="review__card">
                <div className="review__card__left">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/fef2/b7d7/6bcbfccd1f6e6a542aa3e3cb0306f89c?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAh9OXDVrd2atiXbsoEGvzB75QKTs9q5a7tT8ftx7uf302H8Ubsig4tvZxddE1HsGlXCZG9YgihUEA7IvNAf6oFILcWdEMMcy-kg5YBhiS9qPEg0TG8pUHOcvcN~3Ol3whCpn7iLXtaUoXXhvTod8vmZIzuS03sAWt01MixTE7mC903m0Kv~nCgYbiP~fyQPY3lcQdHEjVhPXO5P9zZ2YRh-r3grPIZEr5udqiWj7GUk40pO5in7a5jAm9fc8B5tS-BLYWGB3ar54x9QzbtjBL5ISN04GMv42bKpM1sFK3OSciRdjwn7Tvq4SNJf~zbDucHRnv70QpZGYfKjg8lycA__"
                    alt=""
                  />
                </div>
                <div className="review__card__right">
                  <h3 className="review__card__right__name">John Doe</h3>
                  <div className=" rating__none">{getRating(4)}</div>
                  <div className="review__card__right__media">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/fef2/b7d7/6bcbfccd1f6e6a542aa3e3cb0306f89c?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EAh9OXDVrd2atiXbsoEGvzB75QKTs9q5a7tT8ftx7uf302H8Ubsig4tvZxddE1HsGlXCZG9YgihUEA7IvNAf6oFILcWdEMMcy-kg5YBhiS9qPEg0TG8pUHOcvcN~3Ol3whCpn7iLXtaUoXXhvTod8vmZIzuS03sAWt01MixTE7mC903m0Kv~nCgYbiP~fyQPY3lcQdHEjVhPXO5P9zZ2YRh-r3grPIZEr5udqiWj7GUk40pO5in7a5jAm9fc8B5tS-BLYWGB3ar54x9QzbtjBL5ISN04GMv42bKpM1sFK3OSciRdjwn7Tvq4SNJf~zbDucHRnv70QpZGYfKjg8lycA__"
                      alt=""
                    />
                    <div>
                      <h3>John Doe</h3>
                      <div className="rating">{getRating(4)}</div>
                    </div>
                  </div>
                  <p>
                    I bought it 3 weeks ago and now come back just to say
                    “Awesome Product”. I really enjoy it. At vero eos et
                    accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupt et quas
                    molestias excepturi sint non provident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {abTab == 2 ? (
          <div className="reviews">
            <h3>Frequently asked questions</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur, repudiandae unde. Eaque non quod, in impedit
              consequatur unde. Impedit, laborum facilis saepe animi corporis,
              dignissimos aliquam, aliquid labore praesentium ipsa culpa quod
              non ipsam sint laudantium. Quos pariatur unde consequatur quaerat
              animi hic quisquam debitis maxime amet, officia libero magnam.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur, repudiandae unde. Eaque non quod, in impedit
              consequatur unde. Impedit, laborum facilis saepe animi corporis,
              dignissimos aliquam, aliquid labore praesentium ipsa culpa quod
              non ipsam sint laudantium. Quos pariatur unde consequatur quaerat
              animi hic quisquam debitis maxime amet, officia libero magnam.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              error eius accusamus sed quam. Reprehenderit facilis, provident
              magnam iusto qui porro tenetur corporis, repellat ab sed enim quo
              quidem exercitationem cumque consectetur quia aspernatur nobis vel
              velit placeat eaque non architecto. Ipsa temporibus adipisci amet
              fugit sint, quidem dolor velit recusandae, beatae consequuntur
              asperiores a. Doloremque, ad voluptatum. Distinctio sint odio quam
              harum, repellat dolore tenetur consectetur quae ratione. Dolore
              numquam fugit, eaque voluptatem, autem ratione, dolorem vitae
              molestias quos tempora iste ipsam unde ex ullam sed saepe maxime
              excepturi animi quia voluptatum corrupti? Eaque corrupti at
              voluptate quam nemo.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum culpa adipisci sit placeat alias provident id velit ea
              vel explicabo.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              voluptates aspernatur nesciunt assumenda ab libero possimus, nam
              id veniam! Mollitia magnam eos doloribus fuga quos ipsam? Sequi
              mollitia ipsam reprehenderit?
            </p>
          </div>
        ) : (
          <></>
        )}
        {abTab == 1 ? (
          <div className="reviews">
            <h3>Additional informations</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              autem aspernatur ab architecto eligendi atque minima dolores
              voluptatem, iure incidunt nemo labore delectus assumenda eos sint,
              voluptate voluptatibus repellat, quidem quos tenetur officia
              suscipit! Deserunt, sequi non, fugiat voluptates quia consectetur
              expedita quisquam ab eveniet praesentium eligendi suscipit odit
              vero quibusdam voluptas eius quis maxime possimus officiis libero
              ipsum facere. Voluptas unde deserunt debitis saepe ducimus dolores
              veniam! Quisquam nihil, explicabo accusamus labore quibusdam eum!
              Minima eum officiis veritatis fuga aperiam dolorem fugiat
              obcaecati cum? Dolorum repellendus corporis quo totam animi
              laboriosam, porro laudantium, enim quos aliquam eos maiores
              inventore officiis culpa deserunt ipsum dolor quae excepturi illo!
              Suscipit, ipsam quae amet, ullam harum assumenda quibusdam hic
              culpa cum quidem, sit quasi recusandae eius esse a quisquam
              voluptatibus. Pariatur odio placeat velit at amet possimus
              accusamus a id quaerat atque temporibus maxime sapiente sequi
              reiciendis inventore iure, porro vero modi cumque aspernatur quis
              soluta. Itaque, perspiciatis iusto eveniet voluptas quod quisquam
              totam architecto nesciunt ea. Quae porro autem fugiat non,
              deserunt deleniti commodi dolores accusamus id aut aperiam,
              pariatur suscipit obcaecati exercitationem officiis modi animi
              itaque ipsum recusandae libero perferendis! Omnis autem magni et
              architecto porro similique velit iste laboriosam hic veritatis
              provident minus, vero ex nemo placeat? Quo at exercitationem illum
              est iure sunt minima quia, excepturi sequi modi ea alias eaque
              repudiandae, iusto nostrum, similique nam. Dolor eligendi,
              molestias rerum soluta laudantium fugiat eius laborum, possimus
              nisi a eaque veritatis nobis sapiente perferendis explicabo cumque
              sequi. Amet molestias commodi cumque, minima dignissimos harum quo
              asperiores, culpa minus delectus vel porro facere unde veniam
              cupiditate? Voluptatum adipisci illum quis ex, deleniti ab esse
              quae pariatur quas odit voluptas amet autem, recusandae magni nemo
              aspernatur sed magnam eligendi assumenda reprehenderit omnis?
              Ducimus necessitatibus ex ut expedita. Deserunt earum magnam quod?
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        style={{ marginTop: 50, marginBottom: -50 }}
        className="single__join"
      >
        <Join />
      </div>
    </div>
  );
};

export default memo(SinglePage);
