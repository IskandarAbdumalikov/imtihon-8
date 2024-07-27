import React, { memo, useState } from "react";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../context/api/categoryApi";
import "../admin/admin.scss";
import EditModule from "./EditModule";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CategoryManage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { data: categories } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

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

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete.id);
      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
                onClick={() => handleDelete(category)}
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this category?
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
    </div>
  );
};

export default memo(CategoryManage);
