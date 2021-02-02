import React from "react";
import "./ManageOptions.css";

const ManageOptions = ({ onEdit, onDelete }) => {
  return (
    <span className="manageOptions">
      <span onClick={onEdit}>🖊</span> <span onClick={onDelete}>❌</span>
    </span>
  );
};

export default ManageOptions;
