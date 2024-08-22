import React from "react";
import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import BotManagerTable from "@/components/BotManagers/BotManagerTable";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Management  | Homi Chat Platform"
};

const WhatsappBotSettingPage: React.FC = () => {
  

  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="WhatsApp Bot Managers" />
      
      <div className="flex flex-col gap-10">
        <BotManagerTable />
      </div>
    </AdminLayout>
  );
};

export default WhatsappBotSettingPage