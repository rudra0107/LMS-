"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/app/(dashboard)/_components/logo";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { Categories } from "@/app/(dashboard)/(routes)/(root)/_components/categories";
import { db } from "@/lib/db";
import { useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const catogories = [
    { id: "04f8ee8b-805f-45ce-b5c3-38866582f190", name: "Accounting" },
    {
      id: "e3df01d0-1578-4328-8795-b06ace923181",
      name: "Computer Science",
    },
    { id: "e104757c-bb07-41ce-926f-705cdb0906ce", name: "Engineering" },
    { id: "9c36dcaf-51ac-4a4c-88d9-dbe58d7e2933", name: "Filming" },
    { id: "8b8e5735-d6e4-47f7-a214-10e301ede89f", name: "Fitness" },
    { id: "34812fd8-34ba-406e-8e6f-247a6eb57614", name: "Music" },
    { id: "439f3651-88d4-4c5b-bc37-5708512eba8d", name: "Photography" },
  ];

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const isDashboardPage = pathname?.startsWith("/dashboard");
  // const isSearch = pathname.includes("/search");

  return (
    <>
      <Link href={`/`}>
        <div className="p-6">
          <Logo />
        </div>
      </Link>
      <div>
        {/* <Popover>
          <PopoverTrigger>Categories</PopoverTrigger>
          <PopoverContent>
            <Categories items={catogories} />
          </PopoverContent>
        </Popover> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Categories</TooltipTrigger>
            <TooltipContent>
              <Categories items={catogories} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {isSearchPage && (
        <div className="mx-auto md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage ? (
          <Link href="/">
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Student Mode
            </Button>
          </Link>
        ) : (
          <>
            {isDashboardPage ? (
              <>
                <Link href="/teacher/courses">
                  <Button>Teacher mode</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button>My Learnings</Button>
                </Link>
                <Link href="/teacher/courses">
                  <Button>Teacher mode</Button>
                </Link>
              </>
            )}
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
      {/* <section>odiibw</section> */}
    </>
  );
};
