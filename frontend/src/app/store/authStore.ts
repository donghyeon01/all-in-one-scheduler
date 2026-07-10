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
  accessToken: null,
  user: null,
  isAuthenticated: false,

  // 로그인 함수
  login: (accessToken) => {
    set({
      accessToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
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
