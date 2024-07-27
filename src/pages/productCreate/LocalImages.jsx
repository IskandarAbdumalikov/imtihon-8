import React, { memo } from "react";

const LocalImages = ({ files }) => {
  return (
    <div className="local__images">
      {Array.from(files).map((file, index) => (
        <img src={URL.createObjectURL(file)} key={index} width={80} alt="" />
      ))}
    </div>
  );
};

export default memo(LocalImages);
