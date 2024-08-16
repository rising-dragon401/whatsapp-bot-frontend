import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";

export const metadata: Metadata = {
  title: "Chat Log Page | Homi Chat Platform"
};

const ChatlogPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Chat Logs" />
    </AdminLayout>
  );
};

export default ChatlogPage