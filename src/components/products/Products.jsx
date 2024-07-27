import React from "react";
import "./products.scss";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaCartArrowDown, FaEdit } from "react-icons/fa";
import star from "../../assets/products/star.svg";
import halfStar from "../../assets/products/starHalf.svg";
import starRegular from "../../assets/products/starRegular.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import {
  add,
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import { MdDelete } from "react-icons/md";

const Products = ({ data, isLoading, isFetching, isShowManaging, onEdit }) => {
  const wishlistData = useSelector((state) => state.wishlist.value);
  const cartData = useSelector((state) => state.cart.value);

  let dispatch = useDispatch();
  const getRating = (rating) => {
    let res = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      res.push(<img src={star} alt="" />);
    }
    if (rating % 1 > 0.4) {
      res.push(<img src={halfStar} alt="" />);
    }
    for (let i = Math.round(rating); i < 5; i++) {
      res.push(<img src={starRegular} alt="" />);
    }
    return res;
  };

  return (
    <section className="products">
      <div className="products__cards">
        {isLoading || isFetching ? (
          <Loading numCards={8} />
        ) : (
          data?.map((product) => (
            <div className="product__card" key={product.id}>
              <div className="product__card__image">
                {cartData.some((el) => el.id === product.id) ? (
                  <div className="counter__btn">
                    {cartData.find((el) => el.id === product.id).amount ===
                    1 ? (
                      <button
                        onClick={() =>
                          dispatch(
                            remove(cartData.find((el) => el.id === product.id))
                          )
                        }
                        className="px-4 py-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            decreaseAmount(
                              cartData.find((el) => el.id === product.id)
                            )
                          )
                        }
                        className="px-4 py-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                    )}
                    <span className="text-2xl">
                      {cartData.find((el) => el.id === product.id).amount}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseAmount(
                            cartData.filter((el) => el.id === product.id)[0]
                          )
                        )
                      }
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-to-cart__btn"
                    onClick={() => dispatch(add(product))}
                  >
                    ADD to cart
                  </button>
                )}
                <div className="menu-btns">
                  <button onClick={() => dispatch(toggleHeart(product))}>
                    {wishlistData.some((el) => el.id === product.id) ? (
                      <FaHeart color="crimson" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>
                <Link to={`/products/${product.id}`}>
                  <img src={product?.images[0]} alt={product?.title} />
                </Link>
              </div>
              <div className="product__card__info">
                <div className="rating__wrapper">
                  <div className="rating">
                    <div>{getRating(product?.rating)}</div>
                    {isShowManaging && (
                      <div className="managing__btns">
                        <button
                          className="edit-btn"
                          onClick={() => onEdit(product)}
                        >
                          <FaEdit />
                        </button>
                        <button className="delete-btn">
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p>{product?.title}</p>
                <div className="price">
                  <p>${product?.price}</p>
                  <p>${product?.oldPrice}</p>
                </div>
              </div>
              <div className="menu-btns__media">
                <button onClick={() => dispatch(toggleHeart(product))}>
                  {wishlistData.some((el) => el.id === product.id) ? (
                    <FaHeart color="crimson" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                {cartData.some((el) => el.id === product.id) ? (
                  <div className="products__card__add-to-cart">
                    {cartData.find((el) => el.id === product.id).amount ===
                    1 ? (
                      <button
                        onClick={() =>
                          dispatch(
                            remove(cartData.find((el) => el.id === product.id))
                          )
                        }
                      >
                        -
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            decreaseAmount(
                              cartData.find((el) => el.id === product.id)
                            )
                          )
                        }
                        className="px-4 py-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                    )}
                    <span className="text-2xl">
                      {cartData.find((el) => el.id === product.id).amount}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseAmount(
                            cartData.filter((el) => el.id === product.id)[0]
                          )
                        )
                      }
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button onClick={() => dispatch(add(product))}>
                    <FaCartArrowDown />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div
        style={{ marginTop: 50 }}
        className="products__card__pagination"
      ></div>
    </section>
  );
};

export default Products;
