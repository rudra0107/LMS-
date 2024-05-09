"use client";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  return (
    <div className="h-full">
      {isTeacherPage ? (
        <>
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="pt-[80px] md:pl-56 h-full">{children}</main>
        </>
      ) : (
        <>
          {" "}
          <div className="h-[80px] fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <main className="pt-[80px] h-full">{children}</main>
        </>
      )}
      {/* <main className="pt-[80px] h-full">{children}</main> */}
    </div>
  );
};

export default DashboardLayout;
