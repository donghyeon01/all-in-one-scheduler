import axiosInstance from "@/shared/api/axios";

export interface Friend {
  id: string; // 혹은 number. 백엔드에서 Long(number)으로 반환하므로 string으로 캐스팅하거나 맞춰줍니다.
  name: string;
  email: string;
}

export const friendsApi = {
  getFriends: async (): Promise<Friend[]> => {
    const response = await axiosInstance.get("/api/friends");
    // 백엔드에서 반환된 id(Long)를 string으로 안전하게 변환하여 프론트엔드 일관성 유지
    return response.data.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      email: item.email,
    }));
  },

  addFriend: async (friendEmail: string): Promise<void> => {
    await axiosInstance.post("/api/friends", { friendEmail });
  },

  deleteFriend: async (friendId: string | number): Promise<void> => {
    await axiosInstance.delete(`/api/friends/${friendId}`);
  },
};
