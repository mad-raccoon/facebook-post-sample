import React, { useState } from "react";
import { useQuery } from "react-query";
import Post from "../../components/Post/Post";
import { useHistory, useParams } from "react-router-dom";
import ListPageLayout from "../../../../layouts/ListPageLayout/ListPageLayout";
import { servicePost } from "../../../../../shared/api";

const sortOptions = [
  { name: "date", value: "timestamp" },
  { name: "score", value: "voteScore" },
  { name: "title", value: "title" },
  { name: "author", value: "author" },
  { name: "body", value: "body" },
];

const PostCategoriesPage = () => {
  const history = useHistory();
  const { category } = useParams();
  const [orderBy, setOrderBy] = useState(sortOptions[0].value);

  let { data: posts = [], isLoading } = useQuery(
    ["posts", { category }],
    () => servicePost.getPostsPerCategory(category),
    {
      enabled: category !== "all",
    }
  );
  posts = posts.sort((a, b) => (a[orderBy] > b[orderBy] ? -1 : 1));

  const handleAddPost = () => {
    history.push("/new-post");
  };

  return (
    <ListPageLayout
      title={`Posts of ${category}`}
      onNew={handleAddPost}
      sortOptions={sortOptions}
      onSort={(value) => setOrderBy(value)}
      isLoading={isLoading}
    >
      {posts.length === 0 && <p>There are no posts for this category !</p>}
      <div className="scrollList">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </ListPageLayout>
  );
};

export default PostCategoriesPage;
