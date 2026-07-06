import Button from "@/shared/components/button/Button";
import PageHeader from "@/shared/components/header/PageHeader";

export default function FriendsPage() {
  const friends = ["김철수", "이영희", "박민수"];

  return (
    <div className="">
      <PageHeader
        title="친구 관리"
        description="친구를 관리하고 일정을 공유해보세요.">
        <Button>+ 친구추가</Button>
      </PageHeader>

      <div className="space-y-3">
        {friends.map((friend) => (
          <div
            key={friend}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            p-5
          ">
            <span>{friend}</span>

            <button>프로필</button>
          </div>
        ))}
      </div>
    </div>
  );
}
