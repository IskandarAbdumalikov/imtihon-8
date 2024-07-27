import React, { useState } from "react";
import { useCreateCategoryMutation } from "../../context/api/categoryApi";
import "../admin/admin.scss";

const initialState = {
  name: "",
  title: "",
};

const CategoryCreate = () => {
  const [handleCreate, { data }] = useCreateCategoryMutation();
  const [categoryData, setCategoryData] = useState(initialState);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const { name, title } = categoryData;
    await handleCreate({
      name,
      title: name,
    });
    setCategoryData(initialState);
  };

  return (
    <div className="category-create">
      <div>
        <h2 className="form-title">Create category</h2>
        <form onSubmit={handleCreateCategory} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Category name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-button">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
