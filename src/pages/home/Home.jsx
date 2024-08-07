import React, { memo, useState } from "react";
import "./home.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useGetProductsQuery } from "../../context/api/productApi";
import { Link } from "react-router-dom";
import Products from "../../components/products/Products";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import saleBg from "../../assets/home/saleBg.svg";
import { articlesData } from "../../../data";

import Join from "../../components/join/Join";
import SupportCards from "../../components/supportCards/SupportCards";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  let [category, setCategory] = useState("");
  let [limit, setLimit] = useState(8);

  let { data: blogData } = useGetProductsQuery({ limit: 3, page: 3 });
  let { data, isLoading, isFetching } = useGetProductsQuery({
    category,
    limit,
    page: 1,
  });
  let { data: categoryData } = useGetCategoriesQuery();

  return (
    <div>
      <section className="hero container">
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
          <SwiperSlide>
            <img
              src="https://s3-alpha-sig.figma.com/img/7dce/fc24/0db6128ab1993d65eae0e96498fbd94e?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MZ22BAXr9zB-qxkslBVKlV~2sVH6T5V8UtSXiwA6whP09z9Tchr~cWzdZYlPTdBV3E8VPUH45mmGweaI6M6a4Qx8l9xdNtqTEacUrREBB~AJxsnjup2FqHmOFFNy2fC~sD99uzIQmGUL9nFjC1VGBFIUROafPNi9exfHLRsyd8ul4VXl3eDgrH9Ky1THJuSaXSIbg7JasDkOySjPYg2EBGnYYAxCSj8rBQYlnTbs5hQQjrsQgvtsXjh52E4yqgd0dx35ADuhy4dCyOI88q3MOEhoW3ju6RRQl6O3cUVCzF2mJjtL8Zx3M8uFurHKivaCbCNJUaEiXteFqHYMPzZmoA__"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.thewirecutter.com/wp-content/media/2023/05/sofabuyingguide-2048px-benchmademoderncream.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="hero__middle container">
        <h1>
          Simply Unique<span>/</span> <br /> Simply Better.
        </h1>
        <p>
          <span>3legant</span> is a gift & decorations store based in HCMC,{" "}
          <br />
          Vietnam. Est since 2019.
        </p>
      </section>
      <section className="hero__bottom container">
        {blogData?.slice(0, 3)?.map((item) => (
          <div className="hero__bottom__card" key={item?.id}>
            <div className="hero__bottom__card__content">
              <p>{item?.title}</p>
              <Link to={'/shop'}>Shop Now</Link>
            </div>
            <img src={item?.images[0]} alt="" />
          </div>
        ))}
      </section>
      <section
        style={{ marginTop: 80 }}
        className="container products__section"
      >
        <div className="products__header">
          <h2>
            New <br /> Arrivals
          </h2>

          <Link to="/shop">
            <p>More Products</p> <FaArrowRightLong />
          </Link>
        </div>
        <ul>
          <li
            className={category == "" ? "active-category" : ""}
            onClick={() => setCategory("")}
            aria-disabled={isFetching && isLoading}
          >
            All
          </li>
          {categoryData?.map((el) => (
            <li
              className={category == el.name ? "active-category" : ""}
              onClick={() => setCategory(el.name)}
              key={el.id}
              aria-disabled={isFetching && isLoading}
            >
              {el.title}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Products
            data={data}
            isFetching={isFetching}
            isShowManaging={false}
            isLoading={isLoading}
          />
          <button className="load-more" onClick={() => setLimit(limit + 8)}>
            {isFetching && isLoading ? "Loading..." : "Load More"}
          </button>
        </div>

        <SupportCards bg={"white"} />
      </section>
      <div className="space"></div>
      <section className="sale huge__container">
        <div className="sale__left">
          <img src={saleBg} alt="" />
        </div>
        <div className="sale__right">
          <h3>SALE UP TO 35% OFF</h3>
          <h1>HUNDREDS of New lower prices!</h1>
          <p>
            It’s more affordable than ever to give every room in your home a
            stylish makeover
          </p>
          <Link>Shop Now</Link>
        </div>
      </section>
      <div className="space"></div>
      <section className="articles container">
        <div className="articles__header">
          <h2>Articles</h2>
          <Link to="/articles">More Articles</Link>
        </div>
        <div className="articles__content">
          {articlesData?.map((article) => (
            <div className="article__card" key={article.id}>
              <div className="article__image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="article__info">
                <h3>{article.title}</h3>
                <Link to={article.link}>Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="space"></div>
      <Join />
    </div>
  );
};

export default memo(Home);
