import React from "react";
import { useQuery } from "react-query";
import { servicePost } from "../../../../../shared/api";

// The id param is being used to detect if is a create or a edit
const PostForm = ({
  id,
  title,
  body,
  author,
  category,
  onSubmit,
  onCancel,
}) => {
  const { data: categories = [] } = useQuery(
    "post-categories",
    servicePost.getCategories
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    onSubmit({
      title: elements.title.value,
      body: elements.body.value,
      author: elements.author.value,
      category: elements.category.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <br />
      <input type="text" id="title" name="title" defaultValue={title} />
      <br />
      <br />
      <label htmlFor="body">Body:</label>
      <br />
      <input type="text" id="body" name="body" defaultValue={body} />
      <br />
      <br />
      <label htmlFor="body">Author:</label>
      <br />
      <input
        type="author"
        id="author"
        name="author"
        defaultValue={author}
        disabled={!!id}
      />
      <br />
      <br />
      <label htmlFor="category">Category:</label>
      <br />
      <select
        id="category"
        name="category"
        defaultValue={category}
        disabled={!!id}
      >
        {categories.map((so) => (
          <option key={so.path} value={so.path}>
            {so.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <input type="submit" value="Submit changes" />
      <input type="button" value="Cancel" onClick={onCancel} />
    </form>
  );
};

export default PostForm;
