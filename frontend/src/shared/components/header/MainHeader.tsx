import React from "react";
import { Link, useLocation } from "react-router-dom";
import BaseHeader from "./BaseHeader"; // 공통 헤더 컴포넌트 임포트
import LogoutButton from "@/features/auth/components/LogoutButton";
import Avatar from "../ui/Avatar";
import { useAuthStore } from "@/app/store/authStore";

// 메인 서비스 메뉴 네비게이션 항목 정의
const NAV_ITEMS = [
  { to: "/todo", label: "할일 관리" },
  { to: "/calendar", label: "일정 관리" },
  { to: "/friends", label: "친구관리" },
  { to: "/scheduling", label: "일정 조율" },
];

export default function MainHeader(): React.JSX.Element {
  const location = useLocation();
  // 하드코딩된 이름 대신 로그인한 유저 정보를 authStore에서 가져옴
  const user = useAuthStore((state) => state.user);

  return (
    <BaseHeader
      key={location.pathname}
      // 1. 왼쪽 슬롯: 메인 서비스 로고
      leftSlot={
        <Link to="/todo" className="text-2xl font-black text-accent-purple">
          SOSO
        </Link>
      }
      // 2. 가운데 슬롯: 메인 서비스 메뉴 네비게이션 링크들 (모바일에서는 드롭다운으로 표시됨)
      centerSlot={
        <>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block rounded-lg px-2 py-2 font-bold transition md:px-0 md:py-0 ${
                  isActive
                    ? "text-accent-purple"
                    : "text-text-gray hover:text-text"
                }`}>
                {item.label}
              </Link>
            );
          })}
        </>
      }
      // 3. 오른쪽 슬롯: 유저 프로필 아바타 및 로그아웃 버튼
      rightSlot={
        <>
          <Avatar name={user?.name || "?"} />
          <LogoutButton />
        </>
      }
    />
  );
}
