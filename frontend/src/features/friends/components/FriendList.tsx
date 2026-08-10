import Card from "@/shared/components/card/Card";
import Avatar from "@/shared/components/ui/Avatar";
import Button from "@/shared/components/button/Button";
import EmptyState from "@/shared/components/state/EmptyState";
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
    return <EmptyState title="목록이 비어 있습니다." />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
      {friends.map((friend) => (
        <Card key={friend.id} className="flex flex-col justify-between p-4">
          <div>
            <div className="flex items-center gap-3">
              <Avatar name={friend.name || "?"} size="md" />
              <div className="truncate">
                <h3 className="font-bold text-text text-base truncate">
                  {friend.name || "사용자"}
                </h3>
                <p className="text-xs text-text-secondary truncate">
                  {friend.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {type === "current" && (
              <>
                <Button variant="ghost" size="sm" className="flex-1">
                  프로필 보기
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteFriend?.(friend.id)}>
                  삭제
                </Button>
              </>
            )}

            {type === "received" && (
              <>
                <Button
                  variant="brutal"
                  size="sm"
                  className="flex-1"
                  onClick={() => onAcceptFriend?.(friend.id)}>
                  수락
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteFriend?.(friend.id)}>
                  거절
                </Button>
              </>
            )}

            {type === "sent" && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => onDeleteFriend?.(friend.id)}>
                요청 취소
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
