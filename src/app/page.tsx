import React from "react";
import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import WaBotsTable from "@/components/WhatsAppBot/WaBotsTable";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import LandingBox from "@/components/LandingBox";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


export const metadata: Metadata = {
  title: "AI Bot Admin Page | Homi Chat Platform"
};

export default function Home() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bots" />

      <div className="flex flex-col gap-10">
        <LandingBox />
      </div>      
    </DefaultLayout>
  );
}
