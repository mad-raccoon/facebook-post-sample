/* eslint-disable import/no-anonymous-default-export */
import { api } from "../apiRoot";

export default {
  getPost: async (id) => {
    console.log("getting post", { id });
    const res = await api.get(`/posts/${id}`);
    return res.data;
  },

  getPostComments: async (id) => {
    console.log("getting post comments", { id });
    const res = await api.get(`/posts/${id}/comments`);
    return res.data;
  },

  getPosts: async () => {
    console.log("getting posts");
    const res = await api.get("/posts");
    return res.data;
  },

  getPostsPerCategory: async (category) => {
    console.log("getting posts percategory", { category });
    const res = await api.get(`/${category}/posts`);
    return res.data;
  },

  votePost: async ({ id, vote }) => {
    console.log("voting post", { id, vote });
    const res = await api.post(`/posts/${id}`, {
      option: vote ? "upVote" : "downVote",
    });
    console.log("res", res);
    return res;
  },

  votePostComment: async ({ id, vote }) => {
    console.log("voting post comment", { id, vote });
    const res = await api.post(`/comments/${id}`, {
      option: vote ? "upVote" : "downVote",
    });
    console.log("res", res);
    return res;
  },

  deletePost: async ({ id }) => {
    console.log("deleting post", { id });
    const res = await api.delete(`/posts/${id}`);
    return res;
  },

  deletePostComment: async ({ id }) => {
    console.log("deleting post comment", { id });
    const res = await api.delete(`/comments/${id}`);
    return res;
  },

  editPost: async ({ id, title, body }) => {
    console.log("editing post", { id, title, body });
    const res = await api.put(`/posts/${id}`, {
      title,
      body,
    });
    return res;
  },

  editPostComment: async ({ id, body }) => {
    console.log("editing post", { body });
    const res = await api.put(`/comments/${id}`, {
      body,
    });
    return res;
  },

  createPost: async ({ ...post }) => {
    console.log("creating post", post);
    const now = new Date().toISOString();
    const res = await api.post(`/posts`, { id: now, timestamp: now, ...post });
    return res;
  },

  createPostComment: async ({ ...comment }) => {
    console.log("creating post comment", comment);
    const now = new Date().toISOString();
    const res = await api.post("/comments", {
      id: now,
      timestamp: now,
      ...comment,
    });
    return res;
  },

  getCategories: async () => {
    console.log("getting categories");
    const res = await api.get("/categories");
    return res.data.categories;
  },
};
