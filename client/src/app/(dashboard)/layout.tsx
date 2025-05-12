"use client";

import AppSideBar from "@/components/AppSideBar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSideBar />
        <div className="dashboard__content">
          {/* {courseId && <ChaptersSidebar />} */}
          <div className={cn("dashboard__main")} style={{ height: "100vh" }}>
             <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
