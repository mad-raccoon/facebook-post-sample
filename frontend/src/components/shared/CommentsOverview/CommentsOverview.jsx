import React from "react";
import "./CommentsOverview.css";

const CommentsOverview = ({ count = 0, expanded, onClick = null }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="commentsOverview" onClick={() => onClick && handleClick()}>
      Comments <b>({count})</b>{" "}
      {onClick && (
        <span
          style={{
            transform: expanded && "rotate(180deg)",
          }}
        >
          ⬇
        </span>
      )}
    </div>
  );
};

export default CommentsOverview;
