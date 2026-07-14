import { Footer } from "@/shared/components/footer/Footer";
import MainHeader from "@/shared/components/header/MainHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />

      <main
        className="
        flex-1
        mx-auto
        w-full
        max-w-7xl
        px-4
        sm:px-6
        py-6
        sm:py-8
      ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
