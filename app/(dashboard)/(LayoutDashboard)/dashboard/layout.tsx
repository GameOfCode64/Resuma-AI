"use client";
import ResumeModel from "@/components/Create-resuma";
import ProModal from "@/components/Pro-modal";
import DashboardSidebar from "@/components/Sidebar";
import DashbordTopNav from "@/components/dashbord-top-nav";
import DashboardModialNav from "@/components/mobile-navbar";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import React from "react";

// Matadata
// export const metadata: Metadata = {
//   title: "ResumaAi | Dashboard",
//   description: "MyResumeHub is Modern Resume builder AI",
// };

const layout = ({
  children,
  shownav = false,
  showsidebar = false,
}: {
  children: React.ReactNode;
  shownav: boolean;
  showsidebar: boolean;
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = usePathname();

  if (path === "/dashboard") {
    shownav = true;
  }
  if (path === "/dashboard/resume") {
    shownav = true;
  }
  if (path === "/dashboard/cover-letters") {
    shownav = true;
  }
  if (path === "/dashboard/resignation-letters") {
    shownav = true;
  }
  if (
    path === "/dashboard" ||
    path === "/dashboard/resume" ||
    path === "/dashboard/cover-letters" ||
    path === "/dashboard/resignation-letters"
  ) {
    showsidebar = true;
  }
  return (
    <div className="flex items-start justify-normal w-full">
      <DashboardSidebar apiLimiteCount={0} isPro={false} show={showsidebar} />
      <div className="flex flex-col md:w-[90%] lg:w-[90%] w-full">
        <ResumeModel type="Resume" />
        <ProModal />
        <DashboardModialNav />
        <DashbordTopNav value="" show={shownav} />
        {children}
      </div>
    </div>
  );
};

export default layout;
