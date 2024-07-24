import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useGetProductsBySearchQuery } from "../../../context/api/productApi";
import SearchResults from "./SearchResults";

const HeaderSearchModule = ({
  logo,
  showSearchModule,
  setShowSearchModule,
  searchValue,
  setSearchValue,
}) => {
  let handleClose = () => {
    setShowSearchModule(false);
    setSearchValue("");
  };
  let { data, isError } = useGetProductsBySearchQuery({
    title: searchValue.trim(),
  });
  return (
    <div
      className={
        showSearchModule
          ? "header__search  show__header__search"
          : "header__search"
      }
    >
      <NavLink to={"/"}>
        <img src={logo} alt="" />
      </NavLink>
      <div className="container search__form__wrapper">
        <form action="">
          <CiSearch />
          <input
            autoFocus
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
          />
          {searchValue.trim() ? (
            <MdCancel onClick={() => setSearchValue("")} />
          ) : (
            <></>
          )}
        </form>
        {searchValue ? (
          <SearchResults
            isError={isError}
            handleClose={handleClose}
            data={data}
          />
        ) : (
          <></>
        )}
      </div>
      <button className="cancel__btn" onClick={handleClose}>
        Cancel
      </button>
    </div>
  );
};

export default HeaderSearchModule;
