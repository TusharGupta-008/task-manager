const BASE_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const fetchTasks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTask = async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
};

export const toggleTask = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
  });

  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};