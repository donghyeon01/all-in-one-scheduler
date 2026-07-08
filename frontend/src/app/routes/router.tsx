import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import TodoPage from "@/pages/TodoPage";
import CalendarPage from "@/pages/CalendarPage";
import FriendsPage from "@/pages/FriendsPage";
import SchedulingPage from "@/pages/SchedulingPage";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

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
        element: <TodoPage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/friends",
        element: <FriendsPage />,
      },
      {
        path: "/scheduling",
        element: <SchedulingPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
