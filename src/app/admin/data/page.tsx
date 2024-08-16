import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";

export const metadata: Metadata = {
  title: "Data Management Page | Homi Chat Platform"
};

const DataManagementPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Data Management" />
    </AdminLayout>
  );
};

export default DataManagementPage