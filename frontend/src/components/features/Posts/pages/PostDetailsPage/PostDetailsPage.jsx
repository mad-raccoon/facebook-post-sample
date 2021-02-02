import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import BasePageLayout from "../../../../layouts/BasePageLayout/BasePageLayout";
import PostForm from "../../components/PostForm/PostForm";
import { servicePost } from "../../../../../shared/api";
import PostComment from "../../components/PostComments/components/PostComment/PostComment";

const PostDetailsPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const { data: post = {}, isLoading } = useQuery(["post", { id }], () =>
    servicePost.getPost(id)
  );

  const { data: postComments = [] } = useQuery(["post-comments", { id }], () =>
    servicePost.getPostComments(id)
  );

  console.log(postComments);

  const { mutate: editPost } = useMutation(servicePost.editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("post", { id });

      // I know it's not a good practice :P
      alert("Post edited with success !");
      history.push("/posts");
    },
  });

  const handleSubmit = ({ title, body }) => {
    editPost({ id, title, body });
  };

  const handleCancel = () => {
    history.push("/posts");
  };

  return (
    <BasePageLayout
      title={isEditMode ? "Editing post..." : "Post details"}
      buttonText="Add new post"
      isLoading={isLoading}
    >
      {isEditMode && (
        <PostForm {...post} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}

      {!isEditMode && (
        <div>
          <p>Title: {post.title}</p>
          <p>Body: {post.title}</p>
          <p>Category: {post.category}</p>
          <p>Author: {post.author}</p>
          <p>Comments:</p>
          <div className="comments">
            {postComments.map((comment) => (
              <PostComment {...comment} />
            ))}
          </div>
        </div>
      )}
      <br />
      <input
        type="button"
        value="View/Edit"
        onClick={() => setIsEditMode((prev) => !prev)}
      />
      <input type="button" value="Go back" onClick={handleCancel} />
    </BasePageLayout>
  );
};
export default PostDetailsPage;
