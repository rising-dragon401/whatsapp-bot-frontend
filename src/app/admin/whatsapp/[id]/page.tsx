import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import EditWaBot from "@/components/WhatsAppBot/EditWaBot";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Management  | Homi Chat Platform"
};

const WhatsappBotEdit: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Edit WhatsApp Bot" />
      
      <div className="flex flex-col gap-10">
        <EditWaBot />
      </div>
    </AdminLayout>
  );
};

export default WhatsappBotEdit