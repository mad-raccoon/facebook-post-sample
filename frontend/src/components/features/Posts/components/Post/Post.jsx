import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { servicePost } from "../../../../../shared/api";
import { ManageOptions, Voting, CommentsOverview } from "../../../../shared";
import PostComments from "../PostComments/PostComments";
import "./Post.css";

const Post = ({ id, title, author, commentCount, voteScore, category }) => {
  const location = useHistory();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  let { data: comments = [] } = useQuery(
    ["post-comments", { id }],
    () => servicePost.getPostComments(id),
    { enabled: showComments }
  );

  const { mutate: votePost } = useMutation(servicePost.votePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const { mutate: deletePost } = useMutation(servicePost.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleVote = (vote) => {
    votePost({ id, vote });
  };

  const handleEdit = () => {
    location.push(`/posts/${id}`);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const toDelete = confirm("Are you sure about this ?");
    toDelete && deletePost({ id });
  };

  return (
    <div className="post">
      <div className="postStripe">
        <b>{author}</b>
        <div className="postManage">
          <ManageOptions onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <p>{title}</p>
      <div className="postStripe">
        <Voting count={voteScore} onVote={handleVote} />
        <CommentsOverview
          count={commentCount}
          expanded={showComments}
          onClick={() => setShowComments((prev) => !prev)}
        />
      </div>
      {showComments && <PostComments postId={id} comments={comments} />}
    </div>
  );
};

export default Post;
