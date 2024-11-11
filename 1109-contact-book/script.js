const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

let contacts = [
  { id: 1, name: "JohnDoe", email: "john@example.com", phone: "123-456-7890" },
  {
    id: 2,
    name: "AllenYang",
    email: "allen@example.com",
    phone: "123-456-7890",
  },
  {
    id: 3,
    name: "DannyHuang",
    email: "danny@example.com",
    phone: "123-456-7890",
  },
];

let id = 3;

// 查
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((e) => e.id === id);

  return contact
    ? res.json(contact)
    : res
        .status(404)
        .json({ msg: `A Contact with the id of ${id} was not found` });
});

// 增
app.post("/api/contacts", (req, res) => {
  const newContact = {
    id: id + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  return !newContact.name || !newContact.email || !newContact.phone
    ? res.status(400).json({ msg: "missing something" })
    : (id++, contacts.push(newContact), res.status(201).json(contacts));
});

// 改
app.put("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((e) => e.id === id);

  if (!contact) {
    return res
      .status(404)
      .json({ msg: `A contact with the id of ${id} was not found` });
  }

  const { name, email, phone } = req.body;
  if (name && email && phone) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    return res.status(200).json(contact);
  } else {
    return res
      .status(400)
      .json({ msg: "All fields (name,email,phone) must be provided" });
  }
});

// 删
app.delete("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((e) => e.id === id);
  return !contact
    ? res
        .status(404)
        .json({ msg: `A contact with the id of ${id} was not found` })
    : ((contacts = contacts.filter((e) => e.id !== id)),
      res.status(200).json(contact));
});

// 部分修改
app.patch("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((e) => e.id === id);
  const updateData = req.body;

  if (contactIndex === -1) {
    return res
      .status(404)
      .json({ msg: `A contact with the id of ${id} was not found` });
  }

  const nullFields = Object.entries(updateData)
    .filter(([key, value]) => value === null || value === "")
    .map(([key]) => key);

  if (nullFields.length > 0) {
    return res.status(400).json({
      msg: "Null fields are not allowed",
      nullFields: nullFields,
    });
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...updateData };

  return res.status(200).json({
    msg: "Contact updated successfully",
    contact: contacts[contactIndex],
  });
});

app.listen(8000, () => console.log(`sever is running at port 8000`));
