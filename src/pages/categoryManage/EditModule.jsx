import React, { useState, memo } from "react";
import "./editModule.scss";

const EditModule = ({ isProducts, data, onUpdate, setShowEditModule }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="edit-module">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit__module__btns">
          <button type="submit" className="submit-button">
            Update
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowEditModule(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(EditModule);
