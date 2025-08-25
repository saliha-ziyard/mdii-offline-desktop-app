import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <p className="innovator-subtitle">{subtitle}</p>
    </>
  );
};

export default PageHeader;