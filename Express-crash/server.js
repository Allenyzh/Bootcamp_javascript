// const express = require("express");
// const path = require("path");
// const posts = require("./routes/posts");

import express from "express"; // Es modules
import path from "path"; // Es modules
import posts from "./routes/posts.js"; // Es modules
const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// Routes
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
