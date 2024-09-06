"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Wabot } from "@/types/wabot";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosConfig";

const MessagingBox = () => {
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
    <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
      <div className="h-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card xl:flex">
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
          <div className="sticky border-b border-stroke py-7.5 pl-6 pr-7.5 dark:border-dark-3">
            <h3 className="flex items-center justify-between text-lg font-medium text-dark dark:text-white 2xl:text-xl">
              Bot List
            </h3>
          </div>
          <div className="flex max-h-full flex-col overflow-auto px-6 py-7.5 no-scrollbar">
            {
              waBots.map((bot, key) => (
                <div className="flex cursor-pointer items-center rounded-lg py-3 hover:bg-gray-1 dark:hover:bg-dark-2 2xl:px-7.5">
                  <div className="relative mr-4.5 h-14 w-full max-w-14 rounded-full">
                    <Image
                      alt="Bot"
                      loading="lazy"
                      width={40}
                      height={40}
                      src={bot.avatar ? bot.avatar : "/images/icon/bot.png"}
                    />
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 bg-green"></span>
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <h5 className="font-medium text-dark dark:text-white">
                      {bot.name}
                    </h5>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex h-full flex-col border-l border-stroke dark:border-dark-3 xl:w-3/4">
          <div className="no-scrollbar max-h-full space-y-2 overflow-auto px-7.5 py-7">
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
            <div className="w-full max-w-[340px]">
              <p className="mb-2 text-body-sm font-medium">Andri Thomas</p>
              <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="mt-2.5 text-body-sm">1:55pm</p>
            </div>
            <div className="ml-auto max-w-[328px]">
              <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                <p className="font-medium text-dark dark:text-white">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </div>
              <p className="mt-2 text-right text-body-sm">1:58pm</p>
            </div>
          </div>
          <div className="sticky bottom-0 border-t border-stroke bg-white px-7.5 py-5 dark:border-dark-3 dark:bg-gray-dark">
            <form className="flex items-center justify-between space-x-4.5">
              <div className="relative w-full">
                <input
                  className="w-full rounded-full border-[1.5px] border-stroke bg-white py-2.5 pl-4.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  placeholder="Type a message"
                />
              </div>
              <button className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.6357 15.6701L20.3521 10.5208C21.8516 6.02242 22.6013 3.77322 21.414 2.58595C20.2268 1.39869 17.9776 2.14842 13.4792 3.64788L8.32987 5.36432C4.69923 6.57453 2.88392 7.17964 2.36806 8.06698C1.87731 8.91112 1.87731 9.95369 2.36806 10.7978C2.88392 11.6852 4.69923 12.2903 8.32987 13.5005C8.77981 13.6505 9.28601 13.5434 9.62294 13.2096L15.1286 7.75495C15.4383 7.44808 15.9382 7.45041 16.245 7.76015C16.5519 8.06989 16.5496 8.56975 16.2398 8.87662L10.8231 14.2432C10.4518 14.6111 10.3342 15.1742 10.4995 15.6701C11.7097 19.3007 12.3148 21.1161 13.2022 21.6319C14.0463 22.1227 15.0889 22.1227 15.933 21.6319C16.8204 21.1161 17.4255 19.3008 18.6357 15.6701Z"
                      fill="white"
                    />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagingBox;