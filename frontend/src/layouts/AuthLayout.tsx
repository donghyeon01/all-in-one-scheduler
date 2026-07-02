import { Footer } from "@/shared/components/footer/Footer";
import LandingHeader from "../shared/components/header/LandingHeader";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <LandingHeader />
      <Outlet />
      <Footer />
    </>
  );
};
