"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosConfig";
import { useRouter, useParams } from "next/navigation";

const GptModelOptions = [
  {
    "value": "gpt-3.5",
    "name": "GPT-3.5"
  },
  {
    "value": "gpt-3.5-turbo",
    "name": "GPT-3.5 Turbo"
  },
  {
    "value": "gpt-4",
    "name": "GPT-4"
  },
  {
    "value": "gpt-4o",
    "name": "GPT-4o"
  }
]

interface EditWaBotProps {
  WaBotId: string;
}

const EditWaBot = () => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [botName, setBotName] = useState<string>("");
  const [botNumber, setBotNumber] = useState<string>("");
  const [botPrice, setBotPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [gptModel, setGptModel] = useState<string>("");
  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");
  const [systemPrompt, setSystemPrompt] = useState<string>("");

  const router = useRouter();
  const WaBotId = useParams().id;

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    const fetchData =  async () => {
      try{
        const response = await axiosInstance.get(`/wabot/${WaBotId}`)
        if (response) {
          console.log("++++++++++++++++++", response);
          let botdata = response.data;
          setBotName(botdata["name"]);
          setBotNumber(botdata["bot_number"].split(":")[1]);
          setBotPrice(botdata["price"]);
          setDescription(botdata["description"]);
          setGptModel(botdata["gpt_model"]);
          setOpenaiApiKey(botdata["openai_api_key"]);
          setSystemPrompt(botdata["system_prompt"]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  const handleCancel = () => {
    router.push('/admin/whatsapp');
  }

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post('/wabot/', {
        "name": botName,
        "description": description,
        "price": botPrice,
        "bot_number": "whatsapp:" + botNumber,
        "system_prompt": systemPrompt,
        "gpt_model": gptModel,
        "openai_api_key": openaiApiKey
      })
      if (response)
        router.push('/admin/whatsapp');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Bot Information
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="botName"
                  >
                    Bot Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="botName"
                      id="botName"
                      placeholder="Devid Jhon"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="botNumber"
                  >
                    Bot Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                          d="M4.77789 1.70226C5.79233 0.693575 7.46264 0.873121 8.31207 2.00777L9.36289 3.41144C10.0541 4.33468 9.99306 5.62502 9.17264 6.44079L8.97367 6.63863C8.96498 6.66387 8.9439 6.74322 8.96729 6.89401C9.01998 7.23359 9.30354 7.95393 10.494 9.1376C11.684 10.3209 12.4094 10.6041 12.7538 10.657C12.9099 10.6809 12.9915 10.6586 13.0168 10.6498L13.3568 10.3117C14.0862 9.58651 15.2069 9.45095 16.1099 9.94183L17.702 10.8073C19.0653 11.5484 19.4097 13.4015 18.2928 14.5121L17.109 15.6892C16.736 16.06 16.2344 16.3693 15.6223 16.4264C14.1148 16.5669 10.5996 16.3876 6.90615 12.7151C3.45788 9.28642 2.79616 6.29643 2.71244 4.82323L3.33643 4.78777L2.71244 4.82323C2.67011 4.07831 3.02212 3.44806 3.46989 3.00283L4.77789 1.70226ZM7.31141 2.75689C6.88922 2.19294 6.10232 2.1481 5.65925 2.58866L4.35125 3.88923C4.07632 4.1626 3.94404 4.46388 3.96043 4.75231C4.02695 5.92281 4.56136 8.62088 7.78751 11.8287C11.1721 15.194 14.298 15.2944 15.5062 15.1818C15.7531 15.1587 15.9986 15.0305 16.2276 14.8028L17.4114 13.6257C17.8926 13.1472 17.7865 12.276 17.105 11.9055L15.5129 11.0401C15.0733 10.8011 14.5582 10.8799 14.2382 11.1981L13.8586 11.5755L13.418 11.1323C13.8586 11.5755 13.858 11.5761 13.8574 11.5767L13.8562 11.5779L13.8537 11.5804L13.8483 11.5856L13.8361 11.5969C13.8273 11.6049 13.8173 11.6137 13.806 11.6231C13.7833 11.6418 13.7555 11.663 13.7222 11.6853C13.6555 11.73 13.5674 11.7786 13.4567 11.8199C13.231 11.904 12.9333 11.9491 12.5643 11.8925C11.842 11.7817 10.8851 11.2893 9.61261 10.024C8.34054 8.75915 7.84394 7.80671 7.73207 7.08564C7.67487 6.71693 7.72049 6.41918 7.8056 6.1933C7.84731 6.0826 7.89646 5.99458 7.94157 5.928C7.96407 5.8948 7.98548 5.86704 8.00437 5.84449C8.01382 5.83322 8.02265 5.82323 8.03068 5.81451L8.04212 5.80235L8.04737 5.79697L8.04986 5.79445L8.05107 5.79323C8.05167 5.79264 8.05227 5.79204 8.49295 6.23524L8.05227 5.79204L8.29128 5.55439C8.64845 5.19925 8.69847 4.60971 8.36223 4.16056L7.31141 2.75689Z"
                          fill=""
                        />
                      </svg>
                    </span>

                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="botNumber"
                      id="botNumber"
                      placeholder="+19033437865"
                      value={botNumber}
                      onChange={(e) => setBotNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="systemPrompt"
                >
                  Description
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-8">
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
                        d="M9.95153 1.0415L11.2493 1.0415C11.5945 1.0415 11.8743 1.32133 11.8743 1.6665C11.8743 2.01168 11.5945 2.2915 11.2493 2.2915H9.99935C8.01749 2.2915 6.59398 2.29283 5.51066 2.43848C4.44533 2.58171 3.80306 2.85412 3.32835 3.32883C2.85363 3.80355 2.58122 4.44582 2.43799 5.51115C2.29234 6.59447 2.29102 8.01798 2.29102 9.99984C2.29102 11.9817 2.29234 13.4052 2.43799 14.4885C2.58122 15.5539 2.85363 16.1961 3.32835 16.6708C3.80306 17.1456 4.44533 17.418 5.51066 17.5612C6.59398 17.7068 8.01749 17.7082 9.99935 17.7082C11.9812 17.7082 13.4047 17.7068 14.488 17.5612C15.5534 17.418 16.1956 17.1456 16.6704 16.6708C17.1451 16.1961 17.4175 15.5539 17.5607 14.4885C17.7064 13.4052 17.7077 11.9817 17.7077 9.99984V8.74984C17.7077 8.40466 17.9875 8.12484 18.3327 8.12484C18.6779 8.12484 18.9577 8.40466 18.9577 8.74984V10.0476C18.9577 11.9713 18.9577 13.4788 18.7996 14.6551C18.6377 15.859 18.2999 16.809 17.5542 17.5547C16.8086 18.3004 15.8585 18.6382 14.6546 18.8C13.4784 18.9582 11.9708 18.9582 10.0472 18.9582H9.95154C8.02788 18.9582 6.52034 18.9582 5.3441 18.8C4.14016 18.6382 3.19014 18.3004 2.44446 17.5547C1.69879 16.809 1.361 15.859 1.19914 14.6551C1.041 13.4788 1.04101 11.9713 1.04102 10.0477V9.95202C1.04101 8.02836 1.041 6.52083 1.19914 5.34459C1.361 4.14065 1.69879 3.19063 2.44446 2.44495C3.19014 1.69928 4.14016 1.36149 5.3441 1.19963C6.52034 1.04148 8.02787 1.04149 9.95153 1.0415ZM13.9748 1.89643C15.1147 0.756528 16.9628 0.756528 18.1028 1.89643C19.2427 3.03634 19.2427 4.88449 18.1028 6.02439L12.5627 11.5645C12.2533 11.8739 12.0595 12.0678 11.8432 12.2365C11.5884 12.4352 11.3128 12.6055 11.0211 12.7445C10.7735 12.8625 10.5135 12.9492 10.0983 13.0875L7.6779 13.8943C7.23103 14.0433 6.73835 13.927 6.40528 13.5939C6.0722 13.2608 5.95589 12.7682 6.10485 12.3213L6.91166 9.90086C7.05001 9.48572 7.13667 9.22566 7.25468 8.97805C7.39367 8.6864 7.56402 8.41077 7.76272 8.15602C7.93142 7.93973 8.12527 7.74591 8.43472 7.4365L13.9748 1.89643ZM17.2189 2.78032C16.5671 2.12857 15.5104 2.12857 14.8587 2.78032L14.5448 3.09417C14.5637 3.17405 14.5902 3.26923 14.627 3.37539C14.7465 3.71961 14.9725 4.17293 15.3994 4.59983C15.8263 5.02673 16.2796 5.25272 16.6238 5.37215C16.73 5.40898 16.8251 5.43544 16.905 5.45436L17.2189 5.14051C17.8706 4.48876 17.8706 3.43207 17.2189 2.78032ZM15.9203 6.43908C15.4903 6.25417 14.9895 5.95772 14.5155 5.48372C14.0415 5.00971 13.745 4.50886 13.5601 4.07888L9.34727 8.29172C9.00018 8.63881 8.86405 8.77647 8.74836 8.92479C8.6055 9.10795 8.48302 9.30613 8.38308 9.51582C8.30215 9.68564 8.23991 9.86895 8.08469 10.3346L7.72477 11.4144L8.58482 12.2744L9.66456 11.9145C10.1302 11.7593 10.3136 11.697 10.4834 11.6161C10.6931 11.5162 10.8912 11.3937 11.0744 11.2508C11.2227 11.1351 11.3604 10.999 11.7075 10.6519L15.9203 6.43908Z"
                        fill=""
                      />
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    name="description"
                    id="description"
                    rows={2}
                    placeholder="Write your description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="botPrice"
                  >
                    Bot Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                          d="M13 23.8332C18.983 23.8332 23.8333 18.9829 23.8333 12.9998C23.8333 7.01675 18.983 2.1665 13 2.1665C7.01687 2.1665 2.16663 7.01675 2.16663 12.9998C2.16663 18.9829 7.01687 23.8332 13 23.8332ZM13.8125 6.49984C13.8125 6.05111 13.4487 5.68734 13 5.68734C12.5512 5.68734 12.1875 6.05111 12.1875 6.49984V6.84297C10.4212 7.15923 8.93746 8.48625 8.93746 10.2915C8.93746 12.3684 10.9013 13.8123 13 13.8123C14.4912 13.8123 15.4375 14.7935 15.4375 15.7082C15.4375 16.6228 14.4912 17.604 13 17.604C11.5088 17.604 10.5625 16.6228 10.5625 15.7082C10.5625 15.2594 10.1987 14.8957 9.74996 14.8957C9.30123 14.8957 8.93746 15.2594 8.93746 15.7082C8.93746 17.5134 10.4212 18.8404 12.1875 19.1567V19.4998C12.1875 19.9486 12.5512 20.3123 13 20.3123C13.4487 20.3123 13.8125 19.9486 13.8125 19.4998V19.1567C15.5788 18.8404 17.0625 17.5134 17.0625 15.7082C17.0625 13.6313 15.0986 12.1873 13 12.1873C11.5088 12.1873 10.5625 11.2061 10.5625 10.2915C10.5625 9.37688 11.5088 8.39567 13 8.39567C14.4912 8.39567 15.4375 9.37688 15.4375 10.2915C15.4375 10.7402 15.8012 11.104 16.25 11.104C16.6987 11.104 17.0625 10.7402 17.0625 10.2915C17.0625 8.48625 15.5788 7.15923 13.8125 6.84297V6.49984Z"
                          fill=""
                        />
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="number"
                      name="botPrice"
                      id="botPrice"
                      placeholder="5"
                      value={botPrice}
                      onChange={(e) => setBotPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="gptmodel"
                  >
                    GPT Model
                  </label>
                  <div className="relative z-20 rounded-[7px] bg-white dark:bg-dark-2">
                    <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1680_14985)">
                          <path
                            d="M9.99935 18.3334C5.39697 18.3334 1.66602 14.6024 1.66602 10.0001C1.66602 5.39771 5.39697 1.66675 9.99935 1.66675C14.6017 1.66675 18.3327 5.39771 18.3327 10.0001C18.3327 14.6024 14.6017 18.3334 9.99935 18.3334ZM8.09103 16.3896C7.28887 14.6883 6.79712 12.8119 6.68877 10.8334H3.38426C3.71435 13.4805 5.59634 15.6457 8.09103 16.3896ZM8.35827 10.8334C8.4836 12.8657 9.06418 14.7748 9.99935 16.4601C10.9345 14.7748 11.5151 12.8657 11.6404 10.8334H8.35827ZM16.6144 10.8334H13.3099C13.2016 12.8119 12.7098 14.6883 11.9077 16.3896C14.4023 15.6457 16.2844 13.4805 16.6144 10.8334ZM3.38426 9.16675H6.68877C6.79712 7.18822 7.28887 5.31181 8.09103 3.61055C5.59634 4.35452 3.71435 6.51966 3.38426 9.16675ZM8.35827 9.16675H11.6404C11.5151 7.13443 10.9345 5.22529 9.99935 3.54007C9.06418 5.22529 8.4836 7.13443 8.35827 9.16675ZM11.9077 3.61055C12.7098 5.31181 13.2016 7.18822 13.3099 9.16675H16.6144C16.2844 6.51966 14.4023 4.35452 11.9077 3.61055Z"
                            fill="#6B7280"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1680_14985">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>

                    <select
                      value={gptModel}
                      onChange={(e) => {
                        setGptModel(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-10 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-11.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 ${
                        isOptionSelected ? "text-dark dark:text-white" : ""
                      }`}
                    >
                      {
                        GptModelOptions.map((model, key) => (
                          <option value={model.value} className="text-dark-5 dark:text-dark-6" key={key}>
                            {model.name}
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
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="openaiApiKey"
                >
                  OpenAI API Key
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
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
                        d="M8.48177 14.6668C8.48177 13.2746 9.61039 12.146 11.0026 12.146C12.3948 12.146 13.5234 13.2746 13.5234 14.6668C13.5234 16.059 12.3948 17.1877 11.0026 17.1877C9.61039 17.1877 8.48177 16.059 8.48177 14.6668ZM11.0026 13.521C10.3698 13.521 9.85677 14.034 9.85677 14.6668C9.85677 15.2997 10.3698 15.8127 11.0026 15.8127C11.6354 15.8127 12.1484 15.2997 12.1484 14.6668C12.1484 14.034 11.6354 13.521 11.0026 13.521Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.19011 7.3335C6.19011 4.67563 8.34474 2.521 11.0026 2.521C13.2441 2.521 15.1293 4.05405 15.6635 6.12986C15.7582 6.49757 16.133 6.71894 16.5007 6.6243C16.8684 6.52965 17.0898 6.15484 16.9951 5.78713C16.3083 3.11857 13.8867 1.146 11.0026 1.146C7.58534 1.146 4.81511 3.91623 4.81511 7.3335V8.5277C4.60718 8.54232 4.4112 8.56135 4.22683 8.58614C3.40173 8.69707 2.70702 8.93439 2.15526 9.48615C1.6035 10.0379 1.36618 10.7326 1.25525 11.5577C1.1484 12.3524 1.14842 13.3629 1.14844 14.6165V14.7171C1.14842 15.9708 1.1484 16.9812 1.25525 17.7759C1.36618 18.601 1.6035 19.2958 2.15526 19.8475C2.70702 20.3993 3.40173 20.6366 4.22683 20.7475C5.02155 20.8544 6.03202 20.8543 7.28564 20.8543H14.7196C15.9732 20.8543 16.9837 20.8544 17.7784 20.7475C18.6035 20.6366 19.2982 20.3993 19.85 19.8475C20.4017 19.2958 20.639 18.601 20.75 17.7759C20.8568 16.9812 20.8568 15.9708 20.8568 14.7171V14.6165C20.8568 13.3629 20.8568 12.3524 20.75 11.5577C20.639 10.7326 20.4017 10.0379 19.85 9.48615C19.2982 8.93439 18.6035 8.69707 17.7784 8.58614C16.9837 8.47929 15.9732 8.47931 14.7196 8.47933H7.28564C6.89741 8.47932 6.53251 8.47932 6.19011 8.48249V7.3335ZM4.41005 9.94888C3.73742 10.0393 3.38123 10.2047 3.12753 10.4584C2.87383 10.7121 2.70842 11.0683 2.61799 11.7409C2.5249 12.4333 2.52344 13.351 2.52344 14.6668C2.52344 15.9826 2.5249 16.9003 2.61799 17.5927C2.70842 18.2653 2.87383 18.6215 3.12753 18.8752C3.38123 19.1289 3.73742 19.2943 4.41005 19.3848C5.10245 19.4779 6.02014 19.4793 7.33594 19.4793H14.6693C15.9851 19.4793 16.9028 19.4779 17.5952 19.3848C18.2678 19.2943 18.624 19.1289 18.8777 18.8752C19.1314 18.6215 19.2968 18.2653 19.3872 17.5927C19.4803 16.9003 19.4818 15.9826 19.4818 14.6668C19.4818 13.351 19.4803 12.4333 19.3872 11.7409C19.2968 11.0683 19.1314 10.7121 18.8777 10.4584C18.624 10.2047 18.2678 10.0393 17.5952 9.94888C16.9028 9.85579 15.9851 9.85433 14.6693 9.85433H7.33594C6.02014 9.85433 5.10245 9.85579 4.41005 9.94888Z"
                        fill=""
                      />
                    </svg>
                  </span>
                  <input
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    type="password"
                    name="openaiApiKey"
                    id="openaiApiKey"
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="systemPrompt"
                >
                  System Prompt
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-8">
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
                        d="M9.95153 1.0415L11.2493 1.0415C11.5945 1.0415 11.8743 1.32133 11.8743 1.6665C11.8743 2.01168 11.5945 2.2915 11.2493 2.2915H9.99935C8.01749 2.2915 6.59398 2.29283 5.51066 2.43848C4.44533 2.58171 3.80306 2.85412 3.32835 3.32883C2.85363 3.80355 2.58122 4.44582 2.43799 5.51115C2.29234 6.59447 2.29102 8.01798 2.29102 9.99984C2.29102 11.9817 2.29234 13.4052 2.43799 14.4885C2.58122 15.5539 2.85363 16.1961 3.32835 16.6708C3.80306 17.1456 4.44533 17.418 5.51066 17.5612C6.59398 17.7068 8.01749 17.7082 9.99935 17.7082C11.9812 17.7082 13.4047 17.7068 14.488 17.5612C15.5534 17.418 16.1956 17.1456 16.6704 16.6708C17.1451 16.1961 17.4175 15.5539 17.5607 14.4885C17.7064 13.4052 17.7077 11.9817 17.7077 9.99984V8.74984C17.7077 8.40466 17.9875 8.12484 18.3327 8.12484C18.6779 8.12484 18.9577 8.40466 18.9577 8.74984V10.0476C18.9577 11.9713 18.9577 13.4788 18.7996 14.6551C18.6377 15.859 18.2999 16.809 17.5542 17.5547C16.8086 18.3004 15.8585 18.6382 14.6546 18.8C13.4784 18.9582 11.9708 18.9582 10.0472 18.9582H9.95154C8.02788 18.9582 6.52034 18.9582 5.3441 18.8C4.14016 18.6382 3.19014 18.3004 2.44446 17.5547C1.69879 16.809 1.361 15.859 1.19914 14.6551C1.041 13.4788 1.04101 11.9713 1.04102 10.0477V9.95202C1.04101 8.02836 1.041 6.52083 1.19914 5.34459C1.361 4.14065 1.69879 3.19063 2.44446 2.44495C3.19014 1.69928 4.14016 1.36149 5.3441 1.19963C6.52034 1.04148 8.02787 1.04149 9.95153 1.0415ZM13.9748 1.89643C15.1147 0.756528 16.9628 0.756528 18.1028 1.89643C19.2427 3.03634 19.2427 4.88449 18.1028 6.02439L12.5627 11.5645C12.2533 11.8739 12.0595 12.0678 11.8432 12.2365C11.5884 12.4352 11.3128 12.6055 11.0211 12.7445C10.7735 12.8625 10.5135 12.9492 10.0983 13.0875L7.6779 13.8943C7.23103 14.0433 6.73835 13.927 6.40528 13.5939C6.0722 13.2608 5.95589 12.7682 6.10485 12.3213L6.91166 9.90086C7.05001 9.48572 7.13667 9.22566 7.25468 8.97805C7.39367 8.6864 7.56402 8.41077 7.76272 8.15602C7.93142 7.93973 8.12527 7.74591 8.43472 7.4365L13.9748 1.89643ZM17.2189 2.78032C16.5671 2.12857 15.5104 2.12857 14.8587 2.78032L14.5448 3.09417C14.5637 3.17405 14.5902 3.26923 14.627 3.37539C14.7465 3.71961 14.9725 4.17293 15.3994 4.59983C15.8263 5.02673 16.2796 5.25272 16.6238 5.37215C16.73 5.40898 16.8251 5.43544 16.905 5.45436L17.2189 5.14051C17.8706 4.48876 17.8706 3.43207 17.2189 2.78032ZM15.9203 6.43908C15.4903 6.25417 14.9895 5.95772 14.5155 5.48372C14.0415 5.00971 13.745 4.50886 13.5601 4.07888L9.34727 8.29172C9.00018 8.63881 8.86405 8.77647 8.74836 8.92479C8.6055 9.10795 8.48302 9.30613 8.38308 9.51582C8.30215 9.68564 8.23991 9.86895 8.08469 10.3346L7.72477 11.4144L8.58482 12.2744L9.66456 11.9145C10.1302 11.7593 10.3136 11.697 10.4834 11.6161C10.6931 11.5162 10.8912 11.3937 11.0744 11.2508C11.2227 11.1351 11.3604 10.999 11.7075 10.6519L15.9203 6.43908Z"
                        fill=""
                      />
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    name="systemPrompt"
                    id="systemPrompt"
                    rows={6}
                    placeholder="Write your System Prompt here"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditWaBot;
