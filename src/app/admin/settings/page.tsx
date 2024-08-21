import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";

export const metadata: Metadata = {
  title: "Settings Page | Homi Chat Platform"
};

const SettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Settings" />
    </AdminLayout>
  );
};

export default SettingsPage