import {
  Briefcase,
  ChevronRight,
  LayoutDashboardIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function SideBar() {
  return (
    <div className="w-60 border-r bg-white h-full flex flex-col">
      <div className="border-b py-3 px-5 h-16 flex items-center justify-start">
        <p className="font-semibold text-2xl">
          HR<span className="text-blue-700">Champ.</span>
        </p>
      </div>
      <div className="py-2 flex-1 flex flex-col items-start justify-between w-full">
        <ul className="flex-1 w-full">
          <li className="text-sm px-5 py-3 hover:bg-gray-50 hover:text-blue-800 group transition-all duration-500 select-none">
            <Link
              href="/dashboard"
              className="flex items-center justify-start gap-2"
            >
              <LayoutDashboardIcon size={18} />
              <span className="flex-1">Dashboard</span>
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-blue-800"
              />
            </Link>
          </li>
          <li className="text-sm px-5 py-3 hover:bg-gray-50 hover:text-blue-800 group transition-all duration-500 select-none">
            <Link
              href="/dashboard/jobs"
              className="flex items-center justify-start gap-2"
            >
              <Briefcase size={18} />
              <span className="flex-1">Job Offers</span>
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-blue-800"
              />
            </Link>
          </li>
          <li className="text-sm px-5 py-3 hover:bg-gray-50 hover:text-blue-800 group transition-all duration-500 select-none">
            <Link href="#" className="flex items-center justify-start gap-2">
              <Users size={18} />
              <span className="flex-1">Applicants</span>
              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:text-blue-800"
              />
            </Link>
          </li>
        </ul>

        <div className="px-5 w-full border-t pt-3">
          <button className="rounded-full w-full py-2 text-xs bg-gray-300 text-blue-800 font-semibold hover:bg-blue-800 hover:text-white transition-all duration-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
