import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Button from "@/shared/components/button/Button";
import PageHeader from "@/shared/components/header/PageHeader";
import FriendList from "@/features/friends/components/FriendList";
import AddFriendModal from "@/features/friends/components/AddFriendModal";
import Modal from "@/shared/components/modal/Modal";
import { friendsApi } from "@/features/friends/api/friendsApi";

// react-query 캐시 키 (친구/받은요청/보낸요청을 하나의 키 묶음으로 관리)
const FRIENDS_QUERY_KEY = ["friends"] as const;

export default function FriendsPage() {
  const queryClient = useQueryClient();

  // 모달 제어 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // 상단 알림창(Toast) 상태
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 토스트 메시지 알림 유틸 함수
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 1000); // 1초 뒤 자동 소멸
  };

  // 친구 목록 / 받은 요청 / 보낸 요청을 하나의 쿼리로 통합 조회 (기존 useEffect + Promise.all 패턴을 대체)
  const { data, isLoading } = useQuery({
    queryKey: FRIENDS_QUERY_KEY,
    queryFn: async () => {
      const [friendsData, receivedData, sentData] = await Promise.all([
        friendsApi.getFriends(),
        friendsApi.getReceivedRequests(),
        friendsApi.getSentRequests(),
      ]);
      return {
        friends: friendsData,
        receivedRequests: receivedData,
        sentRequests: sentData,
      };
    },
  });

  const friends = data?.friends ?? [];
  const receivedRequests = data?.receivedRequests ?? [];
  const sentRequests = data?.sentRequests ?? [];

  const invalidateFriends = () =>
    queryClient.invalidateQueries({ queryKey: FRIENDS_QUERY_KEY });

  // 친구 요청 보내기 mutation
  const addFriendMutation = useMutation({
    mutationFn: friendsApi.addFriend,
    onSuccess: () => {
      showToast("친구 요청을 보냈습니다.");
      invalidateFriends();
      setIsAddModalOpen(false);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error("친구 요청 실패:", error);
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 404 || serverMessage === "존재하지 않는 유저입니다.") {
        alert("존재하지 않는 유저입니다.");
      } else if (serverMessage) {
        alert(serverMessage); // 본인 추가 불가, 이미 대기중 등 예외 메시지 처리
      } else {
        alert("서버 오류입니다.");
      }
    },
  });
  const handleAddFriend = (email: string) => addFriendMutation.mutate(email);

  // 친구 요청 수락 mutation
  const acceptFriendMutation = useMutation({
    mutationFn: friendsApi.acceptFriendRequest,
    onSuccess: () => {
      showToast("수락했습니다.");
      invalidateFriends();
    },
    onError: (error) => {
      console.error("수락 실패:", error);
      alert("요청 수락에 실패했습니다.");
    },
  });
  const handleAcceptFriend = (friendshipId: string) =>
    acceptFriendMutation.mutate(friendshipId);

  // 친구 삭제 / 요청 거절 / 요청 취소 mutation
  const deleteFriendMutation = useMutation({
    mutationFn: friendsApi.deleteFriend,
    onSuccess: (_data, friendshipId) => {
      // 대상이 현재 받은 요청 목록에 있었는지 판단하여 토스트 팝업 분기
      const isReceived = receivedRequests.some((r) => r.id === friendshipId);
      showToast(isReceived ? "거절했습니다." : "삭제되었습니다.");
      setDeleteTargetId(null);
      invalidateFriends();
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      alert("처리에 실패했습니다.");
    },
  });

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    deleteFriendMutation.mutate(deleteTargetId);
  };

  return (
    <>
      {/* 화면 상단 고정 토스트 알림창 */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg border-2 border-white animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <PageHeader
        title="친구 관리"
        description="친구를 추가하고 약속을 함께 조율해 보세요.">
        <Button onClick={() => setIsAddModalOpen(true)}>+ 친구 추가</Button>
      </PageHeader>

      {isLoading && (
        <p className="mt-6 text-sm font-bold text-slate-400">
          친구 목록을 불러오는 중입니다...
        </p>
      )}

      {/* 레이아웃 분할: 좌측(현재 친구 목록) | 우측(나한테 온 요청 / 내가 보낸 요청) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 왼쪽 섹션: 현재 친구 목록 */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-text border-b-2 border-text pb-2">
            현재 친구 목록 ({friends.length})
          </h2>
          <FriendList
            friends={friends}
            type="current"
            onDeleteFriend={(id) => setDeleteTargetId(id)}
          />
        </div>

        {/* 오른쪽 섹션: 요청 내역 통합 관리 */}
        <div className="space-y-8">
          {/* 나한테 온 친구 요청 */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-text border-b-2 border-text pb-2">
              나한테 온 친구 요청 목록 ({receivedRequests.length})
            </h2>
            <FriendList
              friends={receivedRequests}
              type="received"
              onAcceptFriend={handleAcceptFriend}
              onDeleteFriend={(id) => setDeleteTargetId(id)} // 거절도 DELETE 라우트 공유
            />
          </div>

          {/* 내가 보낸 친구 요청 */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-text border-b-2 border-text pb-2">
              내가 보낸 친구 요청 목록 ({sentRequests.length})
            </h2>
            <FriendList
              friends={sentRequests}
              type="sent"
              onDeleteFriend={(id) => setDeleteTargetId(id)} // 요청 취소도 DELETE 라우트 공유
            />
          </div>
        </div>
      </div>

      {/* 친구 초대 등록 모달 */}
      <AddFriendModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddFriend={handleAddFriend}
      />

      {/* 친구 삭제 확인 2차 모달 */}
      <Modal
        isOpen={deleteTargetId !== null}
        title="확인 요청"
        onClose={() => setDeleteTargetId(null)}>
        <div className="p-4 space-y-4">
          <p className="text-text font-medium text-center">
            정말로 이 작업을 진행하시겠습니까? <br />
            <span className="text-accent text-sm font-bold">
              (친구 끊기, 요청 거절 및 취소는 즉시 반영됩니다)
            </span>
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeleteTargetId(null)}
              className="rounded-xl border-2 border-text bg-white px-4 py-2 font-bold text-text shadow-[2px_2px_0px_0px_#1e2538]">
              취소
            </button>
            <button
              onClick={handleConfirmDelete}
              className="rounded-xl border-2 border-text bg-accent px-4 py-2 font-bold text-text shadow-[2px_2px_0px_0px_#1e2538] hover:bg-opacity-90">
              확인
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
