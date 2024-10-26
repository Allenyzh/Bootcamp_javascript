const express = require("express");

const app = express();

app.use(express.json()); // Middleware to parse JSON

// const router = express.Router();

let todolist = [
  { id: 1, title: "todolist One", description: "sample 1", completed: false },
  { id: 2, title: "todolist Two", description: "sample 2", completed: false },
  { id: 3, title: "todolist Three", description: "sample 3", completed: false },
];

// Get all todolists
app.get("/api/todos", (req, res) => {
  res.json(todolist);
});

// Get a single todo
app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todolist.find((e) => e.id === id);
  if (!todo) {
    return res
      .status(404)
      .json({ msg: `A todolist with the id of ${id} was not found` });
  }
  console.log(todo);
  return res.json({ id: 1, title: "todolist One" });
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todolist.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };

  if (
    !newTodo.title ||
    !newTodo.description ||
    (newTodo.completed !== false && newTodo.completed !== true)
  ) {
    return res
      .status(400)
      .json({
        msg: "Bro, please fill in all fields, or something wrong happeded including not a vaild completed status!!!",
      });
  }
  todolist.push(newTodo);

  res.status(201).json(todolist);
});

// Update todolist
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todolist.find((e) => e.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ msg: `A todolist with the id of ${id} was not found` });
  }

  todo.body = req.body.title;
  todo.body = req.body.description;
  todo.body = req.body.completed;
  
  res.status(200).json(todo);
});

// Delete todolist

app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todolist.find((e) => e.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ msg: `A todolist with the id of ${id} was not found` });
  }

  todolist = todolist.filter((e) => e.id !== id);
  res.status(200).json(todo);
});

// Partially update the todolist

app.patch("/api/todos/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const todo = todolist.find((e) => e.id === id);
    if (!todo) {
        return res
          .status(404)
          .json({ msg: `A todolist with the id of ${id} was not found` });
      }

    
})

app.listen(8000, () => console.log(`服务器在端口8000运行`));