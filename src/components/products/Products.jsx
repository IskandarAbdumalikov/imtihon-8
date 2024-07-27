import React, { memo, useState } from "react";
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
import { Button, Modal, Box, Typography } from "@mui/material";

const Products = ({
  data,
  isLoading,
  isFetching,
  isShowManaging,
  onEdit,
  onDelete,
}) => {
  const wishlistData = useSelector((state) => state.wishlist.value);
  const cartData = useSelector((state) => state.cart.value);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setOpenModal(false);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedProductId);
    handleCloseModal();
  };

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
                        <button
                          onClick={() => handleOpenModal(product.id)}
                          className="delete-btn"
                        >
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this product?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={handleCloseModal}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </section>
  );
};

export default memo(Products);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
