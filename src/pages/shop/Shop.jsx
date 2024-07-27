import React, { memo, useState } from "react";
import "../blog/blog.scss";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";
import { useGetProductsQuery } from "../../context/api/productApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Join from "../../components/join/Join";

const Shop = () => {
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
    <div
      style={{
        marginTop: 20,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
      className="blog"
    >
      <Hero
        title="Shop Page"
        subtitle={"Let’s design the place you always imagined."}
        bg={
          "https://s3-alpha-sig.figma.com/img/0448/da12/7ecfa3700fbcca8f347e6e197dcfb8d1?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=agLeg0QVIYdB8L1smOQpOJFlo2055V92BneR3UzNh8~p5rO7R7c~nFIRH4jNNkxSrxm~lwrkmEcgbjuOhfvSnE0WTd0aCZUgMg4qHiFLWBlS~VYh4Z3uu3CA1UST3PxSlaez6aszWT5--Ahrufn~nn6rtCaiTgPqDk1saVoHRPGcqPlqCNRwUHFQJ4h1dnT1Bt~~p1SzM5OIvQaO6GNC6Yobq6ri5yqKMfwwanqO62gwjEYLqp7mP2apwjzCtA4q7lGaOqCQ6DQRXxo5lIgTuuBJPOXXWPj29jWa-MSsIyezlmzQblp-pTlxZ6Oy9GvPhOOq-l8c7gIt~jqDeUFHNg__"
        }
        route={"shop"}
      />
      <div className="blog__products container">
        <div className="blog__products__header">
          <h3>Living room</h3>
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

export default memo(Shop);
