export default function FriendsPage() {
  const friends = ["김철수", "이영희", "박민수"];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="mb-8 flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">Friends</h1>
          <p className="mt-2 text-text-gray">
            친구를 관리하고 일정을 공유해보세요.
          </p>
        </div>

        <button
          className="
          rounded-xl
          bg-primary
          px-5
          py-3
        ">
          친구 추가
        </button>
      </div>

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
