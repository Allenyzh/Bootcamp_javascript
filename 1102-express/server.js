const express = require("express");
const app = express();
const cors = require("cors"); // 跨域请求
app.use(express.json());
app.use(cors());

let items = [
  { id: 1, name: "Milk", quantity: 5, purchased: false },
  { id: 2, name: "Cola", quantity: 10, purchased: false },
];

let id = 2;

// 查
app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((e) => e.id === id);
  //   console.log(req);
  return item
    ? res.json(item)
    : res
        .status(404)
        .json({ msg: `An item with the id of ${id} was not found` });
});

// 增
app.post("/api/items", (req, res) => {
  const newItem = {
    id: id + 1,
    name: req.body.name,
    quantity: req.body.quantity,
    purchased: req.body.purchased,
  };

  return !newItem.name ||
    !newItem.quantity ||
    typeof newItem.purchased !== "boolean"
    ? res.status(400).json({ msg: "Something missing" })
    : (id++, items.push(newItem), res.status(201).json(items));
});

// 改
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((e) => e.id === id);

  if (!item) {
    return res
      .status(404)
      .json({ msg: `An item with the id of ${id} was not found` });
  }

  const { name, quantity, purchased } = req.body;
  if (name && quantity && typeof purchased !== "undefined") {
    item.name = name;
    item.quantity = quantity;
    item.purchased = purchased;
    return res.status(200).json(item);
  } else {
    return res
      .status(400)
      .json({ msg: "All fields (name, quantity, purchased) must be provided" });
  }
});

// 删
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((e) => e.id === id);
  return !item
    ? res
        .status(404)
        .json({ msg: `An item with the id of ${id} was not found` })
    : ((items = items.filter((e) => e.id !== id)), res.status(200).json(item));
});

// 部分修改
app.patch("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((e) => e.id === id);
  const updateData = req.body;

  if (itemIndex === -1) {
    return res
      .status(404)
      .json({ msg: `An item with the id of ${id} was not found` });
  }

  // 检查是否有 null 字段
  const nullFields = Object.entries(updateData)
    .filter(([key, value]) => value === null)
    .map(([key]) => key);

  if (nullFields.length > 0) {
    return res.status(400).json({
      msg: "Null fields are not allowed",
      nullFields: nullFields,
    });
  }

  // 合并非 null 字段到现有对象
  items[itemIndex] = { ...items[itemIndex], ...updateData };

  return res.status(200).json({
    msg: "Item updated successfully",
    item: items[itemIndex],
  });
});

app.listen(8000, "0.0.0.0", () => console.log(`Server is online at port 8000`));
