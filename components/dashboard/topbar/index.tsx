import { auth } from "@/auth";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

async function TopBar() {
  const data = await auth();

  return (
    <div className="bg-white border-b py-3 px-5 h-16 flex items-center justify-between">
      <div>
        <p className="m-0 p-0 text-lg font-semibold">Welcome Again!</p>
        <p className="text-xs text-gray-400">
          Take a few minutes to discover our app
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href={"#"} className="border p-1 rounded-md">
          <Bell size={20} />
        </Link>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-1 border-none !outline-none flex items-center justify-center gap-2 focus:outline-none"
              >
                <Image
                  src={data?.user?.image as string}
                  alt={data?.user?.name as string}
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                <div className="text-left text-xs w-[100px]">
                  <p className="line-clamp-1">
                    {data?.user?.name?.split(" ")[0]}
                  </p>
                  <p className="line-clamp-1 text-[10px] text-gray-400">
                    {data?.user?.email}
                  </p>
                </div>
                <ChevronDown size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
