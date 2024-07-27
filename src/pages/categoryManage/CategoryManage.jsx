import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../context/api/categoryApi";
import "../admin/admin.scss";
import EditModule from "./EditModule"; 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const CategoryManage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categories } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  console.log(categories);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEdit(true);
  };

  const handleUpdate = async (updatedCategory) => {
    try {
      await updateCategory({ id: selectedCategory.id, body: updatedCategory });
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="category-manage">
      <div className="category-list">
        {categories?.map((category) => (
          <div key={category.id} className="category-card">
            <h2 className="category-title">{category.title}</h2>
            <div className="category-buttons">
              <button
                className="category-button delete"
                onClick={() => deleteCategory(category.id)}
              >
                <MdDelete />
              </button>
              <button
                className="category-button edit"
                onClick={() => handleEdit(category)}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEdit && (
        <EditModule
          isProducts={false}
          data={selectedCategory}
          onUpdate={handleUpdate}
          setShowEditModule={setShowEdit}
        />
      )}
      {showEdit && (
        <div onClick={() => setShowEdit(false)} className="overlay"></div>
      )}
    </div>
  );
};

export default CategoryManage;
