import { Task } from "../interfaces/task";
import { environment } from "@environments/environment";

const url: string = environment.baseUrl;

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(url);
    return await response.json();
  },

  createTask: async (task: { title: string; description: string }): Promise<void> => {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  },

  updateTask: async (id: number, task: { title: string; description: string }): Promise<void> => {
    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  },

  deleteTask: async (id: number): Promise<void> => {
    await fetch(`${url}/${id}`, { method: "DELETE" });
  },
};
