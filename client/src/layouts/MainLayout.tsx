import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <h1 className="text-4xl text-center font-bold p-4">Main</h1>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
