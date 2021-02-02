import React from "react";
import { Loader } from "../../shared";
import "./BasePageLayout.css";

const BasePageLayout = ({ title, children, isLoading = false }) => {
  return (
    <div className="pageLayout">
      {isLoading && <Loader />}
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default BasePageLayout;
