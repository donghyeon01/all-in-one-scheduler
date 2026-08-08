import axiosInstance from "@/shared/api/axios";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface TaskCreateRequest {
  title: string;
  dueDate?: string;
}

export interface TaskUpdateRequest {
  title: string;
  completed: boolean;
  dueDate?: string;
}

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  },

  createTask: async (data: TaskCreateRequest): Promise<void> => {
    await axiosInstance.post("/tasks", data);
  },

  updateTask: async (taskId: number, data: TaskUpdateRequest): Promise<void> => {
    await axiosInstance.put(`/tasks/${taskId}`, data);
  },

  deleteTask: async (taskId: number): Promise<void> => {
    await axiosInstance.delete(`/tasks/${taskId}`);
  },
};

