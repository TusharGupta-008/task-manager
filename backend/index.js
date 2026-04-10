const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = []; // in-memory storage

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // basic validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required",
    });
  }

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PATCH toggle task status
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  task.completed = !task.completed;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});