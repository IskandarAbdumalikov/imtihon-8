import React, { useState, memo } from "react";
import { useCreateProductMutation } from "../../context/api/productApi";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import "../admin/admin.scss";
import { FaStar } from "react-icons/fa";
import LocalImages from "./LocalImages";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "",
  rating: "",
  stock: "",
  images: [],
};

const ProductCreate = () => {
  const { data: categoryData } = useGetCategoriesQuery();
  const [handleCreate] = useCreateProductMutation();
  const [productData, setProductData] = useState(initialState);
  const [imageFiles, setImageFiles] = useState([]);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files) {
      setImageFiles(files);
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const { title, description, price, oldPrice, category, rating, stock } =
      productData;

    const imageUrls = Array.from(imageFiles).map((file) =>
      URL.createObjectURL(file)
    );

    try {
      handleCreate({
        title,
        description,
        price: Number(price),
        oldPrice: Number(oldPrice),
        category,
        rating: Number(rating),
        stock: Number(stock),
        images: imageUrls,
      });

      setProductData(initialState);
      setImageFiles([]);
      navigate("/admin/productManage");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="product-create">
      <form onSubmit={handleCreateProduct} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPrice" className="form-label">
            Old Price
          </label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={productData.oldPrice}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            onChange={handleChange}
            className="form-input"
            required
            name="category"
            id="category"
            value={productData.category}
          >
            {categoryData?.map((el) => (
              <option key={el.id} value={el.name}>
                {el.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <select
            onChange={handleChange}
            className="form-input"
            required
            name="rating"
            id="rating"
            value={productData.rating}
          >
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} <FaStar /> star(s)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images" className="form-label">
            Images (Select files)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleChange}
            className="form-input"
            multiple
          />
          <LocalImages files={imageFiles} />
        </div>
        <button type="submit" className="form-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default memo(ProductCreate);
