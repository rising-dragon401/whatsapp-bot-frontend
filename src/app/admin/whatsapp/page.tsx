import React from "react";
import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import WaBotsTable from "@/components/WhatsAppBot/WaBotsTable";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Page | Homi Chat Platform"
};

const WhatsappBotSettingPage: React.FC = () => {
  

  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="WhatsApp Bots" />
      
      <div className="flex flex-col gap-10">
        <WaBotsTable />
      </div>
    </AdminLayout>
  );
};

export default WhatsappBotSettingPage