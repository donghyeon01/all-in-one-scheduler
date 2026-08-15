import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "@/pages/LandingPage";

// 코드 스플리팅: 페이지 단위 lazy 로딩으로 초기 번들 크기 최소화
const TodoPage = lazy(() => import("@/pages/TodoPage"));
const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const FriendsPage = lazy(() => import("@/pages/FriendsPage"));
const SchedulingPage = lazy(() => import("@/pages/SchedulingPage"));

// lazy 로딩 페이지의 로딩 fallback
const PageFallback = (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-text-secondary font-bold">로딩 중...</div>
  </div>
);

export const router = createBrowserRouter([
  // 로그인 없이 접근(landing)
  {
    element: <AuthLayout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },

  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/todo",
        element: (
          <Suspense fallback={PageFallback}>
            <TodoPage />
          </Suspense>
        ),
      },
      {
        path: "/calendar",
        element: (
          <Suspense fallback={PageFallback}>
            <CalendarPage />
          </Suspense>
        ),
      },
      {
        path: "/friends",
        element: (
          <Suspense fallback={PageFallback}>
            <FriendsPage />
          </Suspense>
        ),
      },
      {
        path: "/scheduling",
        element: (
          <Suspense fallback={PageFallback}>
            <SchedulingPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
