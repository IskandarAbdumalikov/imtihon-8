import React, { useState } from "react";
import "./blog.scss";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import { useGetProductsQuery } from "../../context/api/productApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Join from "../../components/join/Join";

const Blog = () => {
  let [limit, setLimit] = useState(8);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  let { data, isFetching, isLoading } = useGetProductsQuery({
    limit,
    page: 1,
    order,
    orderBy,
  });

  const handleChange = (event) => {
    setOrder(event.target.value);
    setOrderBy("price");
  };
  return (
    <div className="blog">
      <Hero
        title="Our Blog"
        subtitle={"Home ideas and design inspiration"}
        bg={
          "https://s3-alpha-sig.figma.com/img/ebf1/fa59/d1ba64b47e3052e222821d945a80b4b5?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ASD9kvXwzn4czG7ryx9k3GFvldVowyb49B6jbkcC8mMqrhra8x4sg8yqIg-PadtcigtqFrijw9HtTKJkEa0r0HJzr6R4rXAAA9pa23xlMoQ7dSEoV40rn2T5fgud6rvaE0yFyQ3DnWhdURlln-jTUvTlnng8JoCBC~WG8sEPvQuCceuDlB1RRWG7KeDXvtIBcAx8ZwiqoBos56PMSXor-FxZsZlRA7cR54P00pjfmAild7XgLA0RniBBG6Z-~ATpQM225qabPERoW2qYzGObS2cxE1T94eGas1u-Y~ewtvGCx4kLNofO1RBtss9esQG0kB9Zf1LpKU8iuNALk5W4mQ__"
        }
        route={"blog"}
      />
      <div className="blog__products container">
        <div className="blog__products__header">
          <h3>All blog</h3>
          <div className="sorts">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort by price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={order}
                label="Order By Price"
                onChange={handleChange}
              >
                <MenuItem value={"desc"}>Qimmatroqlar</MenuItem>
                <MenuItem value={"asc"}>Arzonroqlar</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="blog__products__products">
          <Products data={data} isFetching={isFetching} isLoading={isLoading} />
          <button
          className="blog__products__products__btn"
            disabled={isFetching || isLoading}
            onClick={() => setLimit((p) => p + 8)}
          >
            {isFetching || isLoading ? "Loading..." : "Show More"}
          </button>
        </div>
      </div>
      <Join />
    </div>
  );
};

export default Blog;
