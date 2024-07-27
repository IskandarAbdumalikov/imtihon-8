import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ data, handleClose, isError }) => {
  console.log(data);

  return (
    <div className="search__results">
      {isError ? (
        <p>No results found</p>
      ) : (
        data?.map((item) => (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className="search__results__card"
            onClick={handleClose}
          >
            <div>
              <img width={25} height={25} src={item.images[0]} alt="" />
            </div>
            <p>{item.title}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default memo(SearchResults);
