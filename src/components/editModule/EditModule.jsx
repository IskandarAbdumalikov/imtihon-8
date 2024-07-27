import React, { useState, useEffect } from "react";
import "./editModule.scss";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";

const EditModule = ({ data, onUpdate, setShowEditModule }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    rating: "",
    stock: "",
  });

  const { data: categoryData } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        oldPrice: data.oldPrice,
        rating: data.rating,
        stock: data.stock,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="edit-module">
      <div className="edit-module__content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              value={formData.category}
            >
              {categoryData?.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Old Price</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              max="5"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowEditModule(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModule;
