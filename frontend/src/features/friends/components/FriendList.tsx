import Card from "@/shared/components/card/Card";
import { type Friend } from "@/features/friends/api/friendsApi";

interface FriendListProps {
  friends: Friend[];
  type: "current" | "received" | "sent";
  onDeleteFriend?: (id: string) => void;
  onAcceptFriend?: (id: string) => void;
}

export default function FriendList({
  friends,
  type,
  onDeleteFriend,
  onAcceptFriend,
}: FriendListProps) {
  if (friends.length === 0) {
    return (
      <div className="text-center py-8 text-text-gray border-2 border-dashed border-text rounded-xl bg-white">
        목록이 비어 있습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
      {friends.map((friend) => (
        <Card key={friend.id} className="flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-text bg-secondary font-black text-text shadow-[1px_1px_0px_0px_#1e2538]">
                {friend.name ? friend.name[0] : "?"}
              </div>
              <div className="truncate">
                <h3 className="font-bold text-text text-base truncate">
                  {friend.name || "사용자"}
                </h3>
                <p className="text-xs text-text-gray truncate">
                  {friend.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {type === "current" && (
              <>
                <button className="flex-1 rounded-xl border-2 border-text bg-white py-1.5 text-xs font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-primary-bg">
                  프로필 보기
                </button>
                <button
                  onClick={() => onDeleteFriend?.(friend.id)}
                  className="rounded-xl border-2 border-text bg-accent px-3 py-1.5 text-xs font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-accent/70">
                  삭제
                </button>
              </>
            )}

            {type === "received" && (
              <>
                <button
                  onClick={() => onAcceptFriend?.(friend.id)}
                  className="flex-1 rounded-xl border-2 border-text bg-secondary py-1.5 text-xs font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:opacity-90">
                  수락
                </button>
                <button
                  onClick={() => onDeleteFriend?.(friend.id)}
                  className="rounded-xl border-2 border-text bg-white px-3 py-1.5 text-xs font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-primary-bg">
                  거절
                </button>
              </>
            )}

            {type === "sent" && (
              <button
                onClick={() => onDeleteFriend?.(friend.id)}
                className="flex-1 rounded-xl border-2 border-text bg-white py-1.5 text-xs font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] transition hover:bg-primary-bg">
                요청 취소
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
