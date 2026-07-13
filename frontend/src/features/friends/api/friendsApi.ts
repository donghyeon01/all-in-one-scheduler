import axiosInstance from "@/shared/api/axios";

export interface Friend {
  id: string; // Friendship 엔티티의 ID
  friendUserId: number; // 상대방 유저의 고유 ID
  name: string;
  email: string;
}

export const friendsApi = {
  // 현재 정식 친구 목록 조회
  getFriends: async (): Promise<Friend[]> => {
    const response = await axiosInstance.get<Friend[]>("/api/friends");
    return response.data.map((item) => ({
      id: String(item.id),
      friendUserId: item.friendUserId,
      name: item.name,
      email: item.email,
    }));
  },

  // 나한테 온 친구 요청 목록 조회
  getReceivedRequests: async (): Promise<Friend[]> => {
    const response = await axiosInstance.get<Friend[]>(
      "/api/friends/requests/received",
    );
    return response.data.map((item) => ({
      id: String(item.id),
      friendUserId: item.friendUserId,
      name: item.name,
      email: item.email,
    }));
  },

  // 내가 보낸 친구 요청 목록 조회
  getSentRequests: async (): Promise<Friend[]> => {
    const response = await axiosInstance.get<Friend[]>(
      "/api/friends/requests/sent",
    );
    return response.data.map((item) => ({
      id: String(item.id),
      friendUserId: item.friendUserId,
      name: item.name,
      email: item.email,
    }));
  },

  // 친구 요청 보내기
  addFriend: async (friendEmail: string): Promise<void> => {
    await axiosInstance.post("/api/friends", { friendEmail });
  },

  // 친구 요청 수락하기
  acceptFriendRequest: async (friendshipId: string): Promise<void> => {
    await axiosInstance.post(`/api/friends/requests/${friendshipId}/accept`);
  },

  // 친구 끊기 / 요청 거절 / 요청 취소 통합
  deleteFriend: async (friendshipId: string): Promise<void> => {
    await axiosInstance.delete(`/api/friends/${friendshipId}`);
  },
};
