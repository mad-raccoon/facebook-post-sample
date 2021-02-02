import React from "react";
import "./Voting.css";

const Voting = ({ count = 0, onVote }) => {
  return (
    <span className="voting">
      <span onClick={() => onVote(true)}>👍</span>{" "}
      <span onClick={() => onVote(false)}>👎</span>
      <b> {count} Votes</b>
    </span>
  );
};

export default Voting;
