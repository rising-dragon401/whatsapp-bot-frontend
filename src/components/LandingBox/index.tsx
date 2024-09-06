"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Wabot } from "@/types/wabot";
import { useAuth } from "@/context/AuthContext";
import ButtonDefault from "../Buttons/ButtonDefault";
import Link from "next/link";
import axiosInstance from "@/api/axiosConfig";
import CreateBotBox from "./CreateBotBox";

const LandingBox = () => {
  const [waBots, setWaBots] = useState<Wabot[] | []>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user == null) return;
    const fetchWaBots = async () => {
      try {
        const response = await axiosInstance.get(`/wabots`)
        if (response)
          setWaBots(response.data);
      } catch (error) {
      }
    }

    fetchWaBots();
  }, [user])

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-3">
        <div className="grid gird-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
          {
            waBots.map((bot, key) => (
              <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="flex items-center gap-3 px-6 py-5">
                  <div className="h-10 w-10 rounded-full">
                    <Image
                      alt="Bot"
                      loading="lazy"
                      width={40}
                      height={40}
                      src={bot.avatar ? bot.avatar : "/images/icon/bot.png"}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-dark dark:text-white">{bot.name}</h4>
                  </div>
                </div>
                <Link className="block rounded-[5px] px-4" href="/chatting">
                  <Image
                    alt="Cards"
                    loading="lazy"
                    width={432}
                    height={238}
                    src={bot.image ? bot.image : "/images/cards/cards-04.png"}
                  />
                </Link>
                <div className="p-6">
                  <p className="w-full max-w-[290px] font-medium">
                    {bot.description}
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="px-10">
        <CreateBotBox />
      </div>
    </div>
  );
};

export default LandingBox;
