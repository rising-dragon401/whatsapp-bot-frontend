import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import DataManagementBox from "@/components/DataManagement";

export const metadata: Metadata = {
  title: "Data Management Page | Homi Chat Platform"
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