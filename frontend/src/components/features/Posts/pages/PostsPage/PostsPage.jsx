import React, { useState } from "react";
import { useQuery } from "react-query";
import Post from "../../components/Post/Post";
import ListPageLayout from "../../../../layouts/ListPageLayout/ListPageLayout";
import { useHistory } from "react-router-dom";
import { servicePost } from "../../../../../shared/api";

const sortOptions = [
  { name: "date", value: "timestamp" },
  { name: "author", value: "author" },
  { name: "title", value: "title" },
  { name: "category", value: "category" },
  { name: "number of votes", value: "voteScore" },
  { name: "number of comments", value: "commentCount" },
];

const PostsPage = () => {
  const history = useHistory();
  const [orderBy, setOrderBy] = useState(sortOptions[0].value);

  let { data: posts = [], isLoading } = useQuery("posts", servicePost.getPosts);
  posts = posts.sort((a, b) => (a[orderBy] > b[orderBy] ? -1 : 1));

  const handleAddPost = () => {
    history.push("/new-post");
  };

  return (
    <ListPageLayout
      title="Posts"
      onNew={handleAddPost}
      sortOptions={sortOptions}
      onSort={(value) => setOrderBy(value)}
      isLoading={isLoading}
    >
      <div className="scrollList">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </ListPageLayout>
  );
};

export default PostsPage;
