import { Footer } from "@/shared/components/footer/Footer";
import MainHeader from "@/shared/components/header/MainHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <MainHeader />

      <div
        className="
        mx-auto
        max-w-300
        px-6
        py-8
      ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
