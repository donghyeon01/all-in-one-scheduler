import { useState } from "react";
import Button from "@/shared/components/button/Button";
import PageHeader from "@/shared/components/header/PageHeader";
import Card from "@/shared/components/card/Card";
import Input from "@/shared/components/input/Input";
import Modal from "@/shared/components/modal/Modal";

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
  const [newFriendEmail, setNewFriendEmail] = useState("");

  // 친구 추가 핸들러
  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendEmail.trim()) return;

    // 임의의 이름과 입력된 이메일로 친구 추가 시뮬레이션
    const newFriend: Friend = {
      id: crypto.randomUUID(),
      name: newFriendEmail.split("@")[0] || "새로운 친구",
      email: newFriendEmail,
    };

    setFriends([...friends, newFriend]);
    setNewFriendEmail("");
    setIsAddModalOpen(false);
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <Card key={friend.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-text bg-secondary font-black text-text shadow-[1px_1px_0px_0px_#1e2538]">
                  {friend.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-text text-lg">{friend.name}</h3>
                  <p className="text-sm text-text-gray">{friend.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 rounded-xl border-2 border-text bg-white py-2 text-sm font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-primary-bg">
                프로필 보기
              </button>
              <button
                onClick={() => handleDeleteFriend(friend.id)}
                className="rounded-xl border-2 border-text bg-accent px-4 py-2 text-sm font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-opacity-90">
                삭제
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* 친구 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        title="새로운 친구 초대"
        onClose={() => setIsAddModalOpen(false)}>
        <form onSubmit={handleAddFriend} className="space-y-4 mt-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-text">
              친구 이메일 주소
            </label>
            <Input
              type="email"
              placeholder="friend@email.com"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-xl border-2 border-text bg-white px-4 py-2 font-bold text-text shadow-[2px_2px_0px_0px_#1e2538]">
              취소
            </button>
            <Button type="submit">초대장 보내기</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
