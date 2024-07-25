import React from "react";
import "./loading.scss";

const Loading = ({ numCards }) => {
  const loadingCard = (
    <div className="loading__card">
      <div className="loading__img bg__animation"></div>
      <div className="loading__info">
        <div className="loading__desc bg__animation"></div>
        <div className="loading__desc bg__animation"></div>
        <div className="loading__desc bg__animation"></div>
      </div>
    </div>
  );

  return (
    <div className="container loading">
      {Array.from({ length: numCards }).map((_, index) => (
        <React.Fragment key={index}>{loadingCard}</React.Fragment>
      ))}
    </div>
  );
};

export default Loading;
