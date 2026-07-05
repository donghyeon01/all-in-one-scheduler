import { Footer } from "@/shared/components/footer/Footer";
import LandingHeader from "../shared/components/header/LandingHeader";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
