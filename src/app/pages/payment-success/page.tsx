"use client";

import Image from "next/image";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id');

  const [data, setData] = useState(null);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return
    
    const fetchData = async() => {
      const response = await fetch(`/api/payment/success?session_id=${session_id}`);
      const data = await response.json();
      setData(data.message);
    }

    fetchData();
    hasRun.current = true;
  }, [session_id])

  return (
    <div className="mx-auto w-full max-w-[1080px] px-10 py-10">
      <div className="rounded-[10px] bg-white px-5 py-10 shadow-1 dark:bg-gray-dark dark:shadow-card sm:py-20">
        <div className="mx-auto w-full max-w-[588px] px-4 sm:px-8 xl:px-0">
          <div className="relative z-1 lg:pt-15 xl:pt-20 2xl:pt-[157px]">
            <div className="absolute left-0 top-0 -z-1">
              <Image
                src={"/images/grids/grid-02.svg"}
                alt="Grid"
                width={575}
                height={460}
                className="mx-auto dark:opacity-30"
              />
            </div>
            <div className="text-center">
              <div
                className="mx-auto mb-10 flex h-28.5 w-full max-w-[114px] items-center justify-center rounded-full border border-stroke bg-white text-dark shadow-error dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                style={{ backgroundColor: "#FF9C55" }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="mb-7 text-heading-4 font-black text-dark dark:text-white lg:text-heading-3">
                Your Payment Was Successfully!
              </h1>
              <p className="mx-auto w-full max-w-[588px]">
                Thank you for your payment. We are excited to assist you. For any inquiries, please return to the WhatsApp thread.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default PaymentSuccess;
