import axiosInstance from "@/shared/api/axios";

export interface MatchResult {
  id: string;
  percent: number;
  date: string;
  time: string;
  availableCount: number;
  totalCount: number;
  startTime: string;
  endTime: string;
}

export interface SchedulingRequest {
  title: string;
  startDate: string;
  endDate: string;
  friendIds: number[]; // 추가: 선택된 친구 ID 배열
}

// 친구 정보 인터페이스 정의
export interface FriendUser {
  id: number;
  name: string;
  email?: string;
}

export const schedulingApi = {
  calculate: async (data: SchedulingRequest): Promise<MatchResult[]> => {
    const response = await axiosInstance.post("/api/scheduling", data);
    return response.data;
  },

  // 추가: 컴포넌트에서 친구들을 불러와서 보여주기 위한 API 함수
  getFriends: async (): Promise<FriendUser[]> => {
    // 실제 엔드포인트에 맞게 수정 필요 (예: /api/friends 또는 /api/friendships)
    const response = await axiosInstance.get("/api/friends");
    return response.data.map((item: any) => ({
      id: item.friend?.id || item.id,
      name: item.friend?.name || item.name,
    }));
  },
};
