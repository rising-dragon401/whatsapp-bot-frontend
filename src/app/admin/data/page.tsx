import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import DataManagementBox from "@/components/DataManagement/DataManagementBox";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Management  | Homi Chat Platform"
};

const DataManagementPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Data Management" />

      <DataManagementBox />
    </AdminLayout>
  );
};

export default DataManagementPage