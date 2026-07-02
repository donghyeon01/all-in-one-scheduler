import { createBrowserRouter } from "react-router-dom";
// import { RootLayout } from "../../layouts/RootLayout";
import LandingPage from "@/pages/LandingPage";
import { AuthLayout } from "@/layouts/AuthLayout";

export const router = createBrowserRouter([
  // 로그인 없이 접근(landing)
  {
    element: <AuthLayout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  // {path: "/",element: <RootLayout />,children: [    ],  },
]);
