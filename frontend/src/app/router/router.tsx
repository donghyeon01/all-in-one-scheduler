import { createBrowserRouter } from "react-router-dom";
// import { RootLayout } from "../../layouts/RootLayout";
import LandingPage from "@/pages/LandingPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import LoginForm from "@/features/auth/AuthForm";

export const router = createBrowserRouter([
  // 로그인 없이 접근(landing)
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
  // {path: "/",element: <RootLayout />,children: [    ],  },
]);
