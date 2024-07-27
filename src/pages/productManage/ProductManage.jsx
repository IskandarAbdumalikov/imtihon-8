import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../context/api/productApi";
import Products from "../../components/products/Products";
import EditModule from "../../components/editModule/EditModule";
import "../admin/admin.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductManage = () => {
  const { data } = useGetCategoriesQuery();
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [limit, setLimit] = useState(8);
  const isLogin = useSelector((state) => state.isLogin.value);
  let navigate = useNavigate();

  const {
    data: productsData,
    isFetching,
    isLoading,
  } = useGetProductsQuery({ limit, page: 1, category });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  const handleUpdate = async (updatedProduct) => {
    await updateProduct({ id: selectedProduct.id, body: updatedProduct });
    setShowEdit(false);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  return (
    <div className="product-manage">
      <div className="filter">
        <select
          className="filter-select"
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        >
          <option value="">All</option>
          {data?.map((el) => (
            <option key={el.title} value={el.name}>
              {el.title}
            </option>
          ))}
        </select>
      </div>
      <Products
        data={productsData}
        isFetching={isFetching}
        isLoading={isLoading}
        isShowManaging={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {showEdit && (
        <EditModule
          data={selectedProduct}
          onUpdate={handleUpdate}
          setShowEditModule={setShowEdit}
        />
      )}
      {showEdit && (
        <div onClick={() => setShowEdit(false)} className="overlay"></div>
      )}

      <button className="load__more-btn" onClick={() => setLimit(limit + 8)}>
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};

export default ProductManage;
