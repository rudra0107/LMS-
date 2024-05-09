"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  LayoutGrid,
  PanelTop,
  LayoutList,
  BarChartHorizontal,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: LayoutGrid,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: PanelTop,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: LayoutList,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChartHorizontal,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
