import SideBar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/topbar";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className=" h-screen min-h-screen w-full flex items-start justify-between bg-gray-100">
      <SideBar />
      <div className="flex-1  min-h-screen">
        <TopBar />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
