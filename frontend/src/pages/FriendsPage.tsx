import { useState } from "react";
import Button from "@/shared/components/button/Button";
import PageHeader from "@/shared/components/header/PageHeader";
import FriendList from "@/features/friends/components/FriendList";
import AddFriendModal from "@/features/friends/components/AddFriendModal";

interface Friend {
  id: string;
  name: string;
  email: string;
}

export default function FriendsPage() {
  // mock 데이터 상태 관리
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "김철수", email: "chulsoo@email.com" },
    { id: "2", name: "이영희", email: "younghee@email.com" },
    { id: "3", name: "박민수", email: "minsu@email.com" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 친구 추가 핸들러
  const handleAddFriend = (email: string) => {
    const newFriend: Friend = {
      id: crypto.randomUUID(),
      name: email.split("@")[0] || "새로운 친구",
      email: email,
    };

    setFriends([...friends, newFriend]);
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id));
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
