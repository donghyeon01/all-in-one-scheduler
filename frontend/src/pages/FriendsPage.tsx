import { useState, useEffect } from "react";
import Button from "@/shared/components/button/Button";
import PageHeader from "@/shared/components/header/PageHeader";
import FriendList from "@/features/friends/components/FriendList";
import AddFriendModal from "@/features/friends/components/AddFriendModal";
import { friendsApi, type Friend } from "@/features/friends/api/friendsApi";

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 친구 목록 로드 함수
  const fetchFriends = async () => {
    try {
      const data = await friendsApi.getFriends();
      setFriends(data);
    } catch (error: any) {
      console.error("친구 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // 친구 추가 핸들러
  const handleAddFriend = async (email: string) => {
    try {
      await friendsApi.addFriend(email);
      await fetchFriends();
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error("친구 추가 실패:", error);
      const message = error?.response?.data?.message || "친구 추가에 실패했습니다.";
      alert(message);
    }
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = async (id: string) => {
    try {
      await friendsApi.deleteFriend(id);
      await fetchFriends();
    } catch (error: any) {
      console.error("친구 삭제 실패:", error);
      const message = error?.response?.data?.message || "친구 삭제에 실패했습니다.";
      alert(message);
    }
  };

  return (
    <>
      <PageHeader
        title="친구 관리"
        description="친구를 추가하고 약속을 함께 조율해 보세요.">
        <Button onClick={() => setIsAddModalOpen(true)}>+ 친구 추가</Button>
      </PageHeader>

      <FriendList friends={friends} onDeleteFriend={handleDeleteFriend} />

      <AddFriendModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddFriend={handleAddFriend}
      />
    </>
  );
}
