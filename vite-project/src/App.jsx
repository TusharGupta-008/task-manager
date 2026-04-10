import { useEffect, useState } from "react";
import "./App.css"; // make sure this is added
import {
  fetchTasks,
  createTask,
  toggleTask,
  deleteTask,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = await createTask(title);
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const handleToggle = async (id) => {
    const updated = await toggleTask(id);
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // 👇 THIS IS WHERE YOUR JSX GOES
  return (
    <div className="container">
      <h2>Task Manager</h2>

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button type="submit">Add</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => handleToggle(task.id)}
              className={`task-text ${task.completed ? "completed" : ""}`}
            >
              {task.title}
            </span>

            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;