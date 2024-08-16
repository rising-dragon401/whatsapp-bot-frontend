import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";

export const metadata: Metadata = {
  title: "AI Bot Admin Page | Homi Chat Platform"
};

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Dashboard" />
    </AdminLayout>
  );
};

export default AdminDashboardPage