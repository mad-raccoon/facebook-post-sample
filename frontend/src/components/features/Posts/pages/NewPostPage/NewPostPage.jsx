import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import BasePageLayout from "../../../../layouts/BasePageLayout/BasePageLayout";
import PostForm from "../../components/PostForm/PostForm";
import { servicePost } from "../../../../../shared/api";

const NewPostPage = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading } = useMutation(
    servicePost.createPost,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");

        // I know it's not a good practice :P
        alert("Post created with success !");
        history.push("/posts");
      },
    }
  );

  const handleSubmit = ({ title, body, author, category }) => {
    createPost({ title, body, author, category });
  };

  const handleCancel = () => {
    history.push("/posts");
  };

  return (
    <BasePageLayout title="New post" isLoading={isLoading}>
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </BasePageLayout>
  );
};
export default NewPostPage;
