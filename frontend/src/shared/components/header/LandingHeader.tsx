import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BaseHeader from "./BaseHeader";

const navItems = [
  { id: "hero", label: "홈" },
  { id: "problem", label: "문제점" },
  { id: "feature", label: "주요기능" },
  { id: "process", label: "이용방식" },
  { id: "example", label: "추천일정" },
];

// 로그인 회원가입 모달창을 위한 props
interface LandingHeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void; // 추가
}

export default function LandingHeader({
  onLoginClick,
  onSignupClick,
}: LandingHeaderProps) {
  const [activeSection, setActiveSection] = useState("hero");

  // 💡 클릭으로 인한 스크롤 중인지 기록하는 변수 (리렌더링 방지를 위해 useRef 사용)
  const isClickScrolling = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. 클릭 시 부드러운 스크롤 이동 함수
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // [추가] 클릭 동작 시작됨을 표시하고 active 상태를 강제로 즉시 지정
      isClickScrolling.current = true;
      setActiveSection(id);

      const HEADER_HEIGHT = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // [추가] 이전 타이머가 남아있다면 제거
      if (timerRef.current) clearTimeout(timerRef.current);

      // [추가] 스크롤 애니메이션이 완전히 끝날 때쯤(약 800ms) 플래그를 false로 원복
      timerRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  // 2. 스크롤 위치에 따라 active 메뉴 변경 (IntersectionObserver 활용)
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // 💡 [핵심] 클릭해서 이동 중일 때는 Observer의 감지 로직을 전부 무시하고 패스합니다!
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      // 상단을 헤더 크기(-76px)만큼 깎고, 화면 위쪽 40% 지점 안으로 섹션이 들어올 때 불이 켜지게 마진 조절
      rootMargin: "-76px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current); // 언마운트 시 타이머 클리어
    };
  }, []);

  return (
    <BaseHeader
      // 1. 왼쪽 슬롯에 로고 전달
      leftSlot={
        <Link to="/" className="text-2xl font-black text-accent-purple">
          SOSO
        </Link>
      }
      // 2. 가운데 슬롯에 맵핑되는 메뉴 버튼 전달
      centerSlot={navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? "text-accent-purple font-bold"
                : "text-gray-500 hover:text-gray-900"
            }`}>
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300" />
            )}
          </button>
        );
      })}
      // 3. 오른쪽 슬롯에 링크 버튼들 전달
      rightSlot={
        <>
          <button
            onClick={onLoginClick}
            className="px-4 py-2 rounded-full border-2 border-transparent hover:border-primary-dark transition-all duration-200 text-sm font-semibold">
            로그인
          </button>
          <button
            onClick={onSignupClick}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground 
            border-2 border-text shadow-[1.5px_1.5px_0px_0px]
            hover:translate-y-[-2px] transition-all duration-200 text-sm font-semibold">
            회원가입
          </button>
        </>
      }
    />
  );
}
