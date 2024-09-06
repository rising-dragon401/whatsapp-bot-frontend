"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axiosInstance from "@/api/axiosConfig";
import { ChatHistory, User } from "@/types/user"
import { Wabot } from "@/types/wabot";
import { useAuth } from "@/context/AuthContext";

const ChatLog = () =>{
  const [users, setUsers] = useState<User[] | []>([]);
  const [chats, setChats] = useState<ChatHistory[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [wabots, setWabots] = useState<Wabot[] | []>([]);
  const [slectedWabotId, setSelectedWabotId] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const { user } = useAuth();

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    if (user == null) return

    const fetchWabots = async () => {
      try {
        const response = await axiosInstance.get(`/wabots`);
        if (response) {
          const bots = response.data;
          setWabots(response.data);
          if (bots.length > 0) {
            setSelectedWabotId(bots[0]._id);
          }
        }
      } catch (error) {

      }
    }
    
    fetchWabots();
  }, [user]);

  useEffect(() => {
    if (slectedWabotId === "") return

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/botusers/?bot_id=${slectedWabotId}`);
        if (response) {
          setUsers(response.data);
          setSelectedUser(null);
          setChats([]);
        }
      } catch (error) {

      }
    }
    
    fetchUsers();
  }, [slectedWabotId])
  
  const handleSelectUser = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/botusers/${id}`)
      if (response) {
        const selected_user = response.data;
        setSelectedUser(selected_user);
        setSelectedUserId(id);
        setChats(selected_user?.chat_history);
      }
    } catch (error) {

    }
    console.log("++++++++++++++++++++", selectedUserId);
  }

  return (
    <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
      <div className="h-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card xl:flex">
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
          <div className="sticky border-b border-stroke py-4.5 pl-6 pr-7.5 dark:border-dark-3">
            <div className="relative z-20 rounded-[7px] bg-white dark:bg-dark-2">
              <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
                    fill=""
                  />
                </svg>
              </span>

              <select
                value={slectedWabotId}
                onChange={(e) => {
                  setSelectedWabotId(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-10 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-11.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 ${
                  isOptionSelected ? "text-dark dark:text-white" : ""
                }`}
              >
                {
                  wabots.map((bot, key) => (
                    <option value={bot._id} className="text-dark-5 dark:text-dark-6" key={key}>
                      {bot.name}
                    </option>    
                  ))
                }
              </select>

              <span className="absolute right-4.5 top-1/2 z-10 -translate-y-1/2 text-dark-4 dark:text-dark-6">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z"
                    fill=""
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex max-h-full flex-col overflow-auto px-6 py-7.5">
            <div className="no-scrollbar max-h-full overflow-auto">
              {
                users.map((user, key) => (
                  <div 
                    className={`${selectedUserId === user._id ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"} flex cursor-pointer items-center rounded-lg py-3 2xl:px-7.5`}
                    key={key}
                    onClick={() => {handleSelectUser(user._id)}}
                  >
                    <div className="relative mr-4.5 h-14 w-full max-w-14 rounded-full">
                      <Image
                        width={56}
                        height={56}
                        src={user.avatar ? user.avatar : "/images/icon/Employee.jpg"}
                        alt="User"
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <h5 className="font-medium text-dark dark:text-white">
                          {user.name? user.name : user.chat_id}
                        </h5>
                        <p>
                          <span className="mt-px text-body-sm font-medium text-dark-3 dark:text-white/80">{user.phone_number}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col border-l border-stroke dark:border-dark-3 xl:w-3/4">
          <div className="sticky flex items-center justify-between border-b border-stroke py-4.5 pl-7.5 pr-6 dark:border-dark-3">
            <div className="flex items-center">
              <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                <Image
                  width={56}
                  height={56}
                  src={selectedUser?.avatar ? selectedUser.avatar : "/images/icon/Employee.jpg"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div>
                <h5 className="font-medium text-dark dark:text-white">
                  {selectedUser?.name ? selectedUser.name : selectedUser?.chat_id}
                </h5>
                <p className="text-body-sm">
                  {selectedUser?.name ? selectedUser.name : selectedUser?.phone_number}
                </p>
              </div>
            </div>
            <div>
              <div className="">
                <div className="relative flex">
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z"
                          fill="">
                        </path>
                        <path
                          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                          fill="">
                        </path>
                        <path
                          d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"
                          fill="">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <div className="no-scrollbar max-h-full space-y-2 overflow-auto px-7.5 py-7">
            {
              chats.map((chat, key) => (
                chat.role === "user" ?
                <div className="w-full max-w-[340px]" key={key}>
                  <p className="mb-2 text-body-sm font-medium">User</p>
                  <div className="rounded-2xl rounded-tl-none bg-[#E8F7FF] px-5 py-3 dark:bg-opacity-10">
                    <p className="font-medium text-dark dark:text-white">
                      {chat.content}
                    </p>
                  </div>
                </div> :
                <div className="ml-auto max-w-[328px]" key={key}>
                  <p className="mb-2 text-body-sm font-medium">Assistant Bot</p>
                  <div className="rounded-2xl rounded-br-none bg-blue-light-5 px-5 py-3 dark:bg-opacity-10">
                    <p className="font-medium text-dark dark:text-white">
                      {chat.content}
                    </p>
                  </div>
                </div>
              ))
            }            
          </div>
        </div>
      </div>                  
    </div>
  );
};

export default ChatLog;