import Card from "@/shared/components/card/Card";

interface Friend {
  id: string;
  name: string;
  email: string;
}

interface FriendListProps {
  friends: Friend[];
  onDeleteFriend: (id: string) => void;
}

export default function FriendList({ friends, onDeleteFriend }: FriendListProps) {
  return (
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
              onClick={() => onDeleteFriend(friend.id)}
              className="rounded-xl border-2 border-text bg-accent px-4 py-2 text-sm font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-opacity-90">
              삭제
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
