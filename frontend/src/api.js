import axios from "axios";

// Base URL of your FastAPI backend
const API_BASE_URL = "http://127.0.0.1:8000";

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ========== TASK APIs ==========

// Add a new task
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Get all tasks (optional filters)
export const fetchTasks = async (filters = {}) => {
  const response = await api.get("/tasks", { params: filters });
  return response.data;
};

// Update a task (status or priority)
export const updateTask = async (taskId, updates) => {
  const response = await api.patch(`/tasks/${taskId}`, updates);
  return response.data;
};

// Delete a task (optional feature)
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// ========== INSIGHTS API ==========
export const fetchInsights = async () => {
  const response = await api.get("/insights");
  return response.data;
};
