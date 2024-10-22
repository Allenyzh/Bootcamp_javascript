import express from "express"; // Es modules
// const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "post One" },
  { id: 2, title: "post Two" },
  { id: 3, title: "post Three" },
];

// Get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get a single posts
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }
  res.status(200).json(post);

  // res.status(200).json(posts.filter((post) => post.id === id));
});

// Create new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: "please include a title" });
  }
  posts.push(newPost);

  res.status(201).json(posts);
});

export default router; // Es modules
