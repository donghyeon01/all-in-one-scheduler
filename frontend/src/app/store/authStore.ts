import { create } from "zustand";
// 전역에  저장할 로그인 정보

//  - 타입
// 저장할 회원정보
interface User {
  id: number;
  email: string;
  name: string;
}

// 현재 로그인 상태 (accessToken , 회원정보, 로그인여부)
interface AuthState {
  accessToken: string | null;
  user: User | null;

  isAuthenticated: boolean;

  login: (accessToken: string) => void;

  logout: () => void;

  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // localStorage에서 토큰 가져옴
  accessToken: localStorage.getItem("accessToken"),
  user: null,
  // !!-> 뒤의 값이 존재하면 true, 없으면 false로 반환 !-> true,false 상태 변환 JS문법
  isAuthenticated: !!localStorage.getItem("accessToken"),

  //  로그인 함수
  login: (accessToken) => {
    // 토큰이 존재하면 localStorage에 토큰 저장
    localStorage.setItem("accessToken", accessToken);
    set({
      //Zustand 전역 토큰 업뎃, 로그인 상태 true로 변한
      accessToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    // localStorage 토큰 지우기
    localStorage.removeItem("accessToken");
    // Zustand 전역값 초기화
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
  // User정보 저장
  setUser: (user) => {
    set({ user });
  },
}));
