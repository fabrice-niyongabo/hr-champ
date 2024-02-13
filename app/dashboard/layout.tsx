import SideBar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/topbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-start justify-between">
      <SideBar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <TopBar />
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
