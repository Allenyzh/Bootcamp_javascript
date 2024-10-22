const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;

const app = express();

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

let posts = [
  { id: 1, title: "post One" },
  { id: 2, title: "post Two" },
  { id: 3, title: "post Three" },
];

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Get a single posts
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id));
});

app.listen(port, () => console.log(`Server is runing on port ${port}`));
