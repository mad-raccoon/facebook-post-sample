import React from "react";
import { Loader } from "../../shared";
import "./ListPageLayout.css";

const ListPageLayout = ({
  title,
  sortOptions,
  onNew,
  onSort,
  children,
  isLoading = false,
}) => {
  const handleSort = (event) => {
    onSort(event.target.value);
  };
  return (
    <div className="pageLayout">
      {isLoading && <Loader />}
      <h1>{title}</h1>
      <p className="header">
        {onNew && <input type="button" value="Add new" onClick={onNew} />}
        <span>
          Order by{" "}
          <select onChange={handleSort}>
            {sortOptions.map((so) => (
              <option key={so.value} value={so.value}>
                {so.name}
              </option>
            ))}
          </select>
        </span>
      </p>
      <div className="listItems">{children}</div>
    </div>
  );
};

export default ListPageLayout;
