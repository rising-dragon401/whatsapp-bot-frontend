import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import WaBotsTable from "@/components/WhatsAppBot/WaBotsTable";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Management  | Homi Chat Platform"
};

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      {/* <AdminBreadcrumb pageName="Dashboard" /> */}
      <AdminBreadcrumb pageName="WhatsApp Bots" />
      
      <div className="flex flex-col gap-10">
        <WaBotsTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage