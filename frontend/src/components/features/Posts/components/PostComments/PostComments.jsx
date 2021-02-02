import React from "react";
import { useMutation, useQueryClient } from "react-query";
import PostComment from "./components/PostComment/PostComment";
import "./PostComments.css";
import { InputSubmit } from "../../../../shared";
import { servicePost } from "../../../../../shared/api";

const PostComments = ({ postId, comments = [] }) => {
  const queryClient = useQueryClient();
  const { mutate: votePostComment } = useMutation(servicePost.votePostComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post-comments", { id: postId });
    },
  });

  const { mutate: createPostComment } = useMutation(
    servicePost.createPostComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-comments", { id: postId });
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const { mutate: deletePostComment } = useMutation(
    servicePost.deletePostComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("post-comments", { id: postId });
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const { mutate: editPostComment } = useMutation(servicePost.editPostComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post-comments", { id: postId });
    },
  });

  const handleVoteComment = (id, vote) => {
    votePostComment({ id, vote });
  };

  const handeDeleteComment = (id) => {
    // eslint-disable-next-line no-restricted-globals
    const toDelete = confirm("Are you sure about this ?");
    toDelete && deletePostComment({ id });
  };

  const handleCreateComment = (comment) => {
    createPostComment({
      body: comment,
      author: "me",
      parentId: postId,
    });
  };

  const handleEditComment = (id, body) => {
    editPostComment({ id, body });
  };

  return (
    <div className="postComments">
      {comments.map((comment) => (
        <PostComment
          key={comment.id}
          onVote={(vote) => handleVoteComment(comment.id, vote)}
          onEdit={(body) => handleEditComment(comment.id, body)}
          onDelete={() => handeDeleteComment(comment.id)}
          {...comment}
        />
      ))}
      <br />
      <div className="addComment">
        Add comment:
        <InputSubmit onSubmit={handleCreateComment} />
      </div>
    </div>
  );
};
export default PostComments;
