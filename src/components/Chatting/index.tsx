"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Wabot } from "@/types/wabot";
import { useAuth } from "@/context/AuthContext";
import ButtonDefault from "../Buttons/ButtonDefault";
import Link from "next/link";
import axiosInstance from "@/api/axiosConfig";
import CreateBotBox from "../LandingBox/CreateBotBox";
import MessagingBox from "./MessagingBox";

const ChattingBox = () => {
  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-3">
        <MessagingBox />
      </div>
      
      <div className="px-10">
        <CreateBotBox />
      </div>
    </div>
  );
};

export default ChattingBox;
