import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import CreateWaBot from "@/components/WhatsAppBot/CreateWaBot";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Page | Homi Chat Platform"
};

const WhatsappBotSettingPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Create New WhatsApp Bot" />
      
      <div className="flex flex-col gap-10">
        <CreateWaBot />
      </div>
    </AdminLayout>
  );
};

export default WhatsappBotSettingPage