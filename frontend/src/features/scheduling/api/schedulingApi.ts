import axiosInstance from "@/shared/api/axios";

export interface MatchResult {
  id: string;
  percent: number;
  date: string;
  time: string;
  availableCount: number;
  totalCount: number;
  startTime: string; // LocalDateTime string (e.g. YYYY-MM-DDTHH:mm:ss)
  endTime: string;
}

export interface SchedulingRequest {
  title: string;
  startDate: string;
  endDate: string;
}

export const schedulingApi = {
  calculate: async (data: SchedulingRequest): Promise<MatchResult[]> => {
    const response = await axiosInstance.post("/api/scheduling", data);
    return response.data;
  },
};
