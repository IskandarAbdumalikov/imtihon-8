import React, { memo, useState } from "react";
import "./products.scss";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaCartArrowDown,
  FaEdit,
  FaRegPlusSquare,
} from "react-icons/fa";
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
import { Button, Modal, Box, Typography, TextField } from "@mui/material";

const Products = ({
  data,
  isLoading,
  isFetching,
  isShowManaging,
  onEdit,
  onDelete,
  onUpdateImages,
}) => {
  const wishlistData = useSelector((state) => state.wishlist.value);
  const cartData = useSelector((state) => state.cart.value);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newImages, setNewImages] = useState("");

  const dispatch = useDispatch();

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
    setOpenModal(false);
    setNewImages("");
  };

  const handleUpdateImages = () => {
    if (newImages) {
      const imagesArray = newImages
        .split("\n")
        .filter((url) => url.trim() !== "");

      const existingProduct = data.find(
        (product) => product.id === selectedProductId
      );
      const combinedImages = [...existingProduct.images, ...imagesArray];

      onUpdateImages(selectedProductId, combinedImages);
      handleCloseModal();
    }
  };

  const getRating = (rating) => {
    let res = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      res.push(<img src={star} alt="" key={`full-${i}`} />);
    }
    if (rating % 1 > 0.4) {
      res.push(<img src={halfStar} alt="" key={`half`} />);
    }
    for (let i = Math.round(rating); i < 5; i++) {
      res.push(<img src={starRegular} alt="" key={`empty-${i}`} />);
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
                          className="add__image"
                          onClick={() => handleOpenModal(product.id)}
                        >
                          <FaRegPlusSquare />
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
                <p className="product__card__category">{product?.category}</p>
                <Link to={`/products/${product.id}`}>
                  <h4 className="product__card__title">{product?.title}</h4>
                </Link>
                <div className="price">
                  <p className="product__card__price">
                    ${product?.price.toFixed(2)}
                  </p>
                  {product?.oldPrice && (
                    <span className="product__card__oldPrice">
                      ${product?.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...styleBox, width: 400 }} className="modal__container">
          <Typography variant="h6" component="h2">
            Update Product Images
          </Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter image URLs (one per line)"
            value={newImages}
            onChange={(e) => setNewImages(e.target.value)}
            fullWidth
            margin="normal"
          />
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateImages}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </section>
  );
};

export default memo(Products);

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
