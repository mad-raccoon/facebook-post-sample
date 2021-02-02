import React, { useState } from "react";
import { InputSubmit, ManageOptions, Voting } from "../../../../../../shared";
import "./PostComment.css";

const PostComment = ({ author, body, voteScore, onVote, onEdit, onDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleEdit = (body) => {
    onEdit(body);
    toggleEditMode();
  };

  return (
    <div className="postComment">
      {isEditMode ? (
        <InputSubmit
          defaultValue={body}
          onSubmit={handleEdit}
          onCancel={toggleEditMode}
        />
      ) : (
        <div>
          <b>{author}: </b>
          {body}
        </div>
      )}
      <br />
      <div className="commentStripe">
        <Voting count={voteScore} onVote={onVote} />
        <ManageOptions onEdit={toggleEditMode} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default PostComment;
