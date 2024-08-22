import { Metadata } from "next";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import AdminBreadcrumb from "@/components/Breadcrumbs/AdminBreadcrumb";
import ChatLog from "@/components/Chat/ChatLog";

export const metadata: Metadata = {
  title: "WhatsApp AI Bot Management  | Homi Chat Platform"
};

const ChatlogPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminBreadcrumb pageName="Chat Logs" />

      <ChatLog />
    </AdminLayout>
  );
};

export default ChatlogPage