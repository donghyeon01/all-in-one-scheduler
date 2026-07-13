import React from "react";
import { Link } from "react-router-dom";
import BaseHeader from "./BaseHeader"; // 공통 헤더 컴포넌트 임포트
import LogoutButton from "@/features/auth/components/LogoutButton";
import Avatar from "../ui/Avatar";

export default function MainHeader(): React.JSX.Element {
  return (
    <BaseHeader
      // 1. 왼쪽 슬롯: 메인 서비스 로고
      leftSlot={
        <Link to="/todo" className="text-2xl font-black text-accent-purple">
          SOSO
        </Link>
      }
      // 2. 가운데 슬롯: 메인 서비스 메뉴 네비게이션 링크들
      centerSlot={
        <>
          <Link
            to="/todo"
            className="font-bold text-text-gray hover:text-text transition">
            할일 관리
          </Link>
          <Link
            to="/calendar"
            className="font-bold text-text-gray hover:text-text transition">
            일정 관리
          </Link>
          <Link
            to="/friends"
            className="font-bold text-text-gray hover:text-text transition">
            친구관리
          </Link>
          <Link
            to="/scheduling"
            className="font-bold text-text-gray hover:text-text transition">
            일정 조율
          </Link>
        </>
      }
      // 3. 오른쪽 슬롯: 유저 프로필 아바타 및 로그아웃 버튼
      rightSlot={
        <>
          <Avatar name="동현" />
          <LogoutButton />
        </>
      }
    />
  );
}
