"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosConfig";
import { PdfFile } from "@/types/pdffile";
import { useAuth } from "@/context/AuthContext";

const convertFileSize = (bytes: number) => {
  if (bytes > 1048576) {
    const mb = bytes / 1048576;
    return mb.toFixed(2) + " MB";
  } else if (bytes > 1024) {
    const kb = bytes / 1024;
    return kb.toFixed(2) + " KB";
  } else {
    return bytes + " B";
  }
}

const DataManagementBox = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfFiles, setPdfFiles] = useState<PdfFile[] | []>([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [listChanged, setListChanged] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user == null) return;
    const fetchPdffiles = async () => {
      try {
        const response = await axiosInstance.get(`/pdffiles/?admin_id=${user.id}&permission=${user.permission}`)
        if (response)
          setPdfFiles(response.data);
      } catch (error) {
      }
    }

    fetchPdffiles();
  }, [fileUploaded, listChanged, user])

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      e.target.value = '';
    }
  };

  const handleCancel = () => {
    setFile(null);
    setFileUploaded(false);
  }

  const handleUpload = async (file: File | null) => {
    if (file) {
      const socket = new WebSocket('wss://homi.chat/ws/data/upload');
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            const base64String = btoa(
              new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
  
            const metadata = {
              filename: file.name,
              data: base64String
            };
  
            socket.send(JSON.stringify(metadata));
          } else {
            console.error('FileReader result is not an ArrayBuffer');
            setFileUploaded(false);
          }          
        };

        reader.readAsArrayBuffer(file);
      };

      socket.onmessage = async (event) => {        
        const pdfdata = JSON.parse(event.data);
        if (pdfdata.status === "success") {
          try {
            const response = await axiosInstance.post('/pdffiles/', {
              "name": pdfdata.filename,
              "path": pdfdata.pathname,
              "size": pdfdata.size,
              "admin_id": user?.id,
              "created_at": pdfdata.created_at,
            })
            if (response) {
              setFileUploaded(true);
              setFile(null);
            }
          } catch (error) {
            setFileUploaded(false);
          }
        }
      };

      socket.onerror = (error) => {
        setFileUploaded(false);
      };

      socket.onclose = () => {
        setFileUploaded(true);
      };

      return () => {
        socket.close();
      };
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/pdffiles/${id}`);
      if (response) {
        setListChanged(!listChanged)
      }
    } catch (error) {
    }
  }

  const handleStartEmbedding = async () => {
    try {
      const response = await axiosInstance.post("/pdffiles/embedding/");
      if (response) {
      }
    } catch (error) {
    }
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-8 ">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="flex border-b border-stroke px-7 py-4 dark:border-dark-3 justify-between">
              <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
                Data List
              </h4>
              {
                user?.permission == "admin" &&
                <button
                  className="flex items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                  onClick={handleStartEmbedding}
                >
                  Start Embedding
                </button>
              }
            </div>
            <div className="p-7">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                    <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                      Name
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                      Size
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                      Date
                    </th>
                    <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pdfFiles.map((pdfFile, index) => (
                    <tr key={index}>
                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === pdfFiles.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <h5 className="text-dark dark:text-white">
                          {pdfFile.name}
                        </h5>
                      </td>
                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === pdfFiles.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <p className="mt-[3px] text-body-sm font-medium">
                          {convertFileSize(pdfFile.size)}
                        </p>
                      </td>
                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === pdfFiles.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <p className="text-dark dark:text-white">
                          {pdfFile.created_at}
                        </p>
                      </td>
                      <td
                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === pdfFiles.length - 1 ? "border-b-0" : "border-b"}`}
                      >
                        <div className="flex items-center justify-end space-x-3.5">
                          <button className="hover:text-primary" onClick={() => handleDelete(pdfFile._id)}>
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
                                d="M8.59048 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5506 3.67715 13.5545 3.68768C13.7004 4.09111 14.0787 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25305 1.8748 8.41016 1.8749 8.59048 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                                fill=""
                              />
                              <path
                                d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0798 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1693 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                                fill=""
                              />
                              <path
                                d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                                fill=""
                              />
                              <path
                                d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>          
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
                Upload New Data
              </h4>
            </div>
            {
              file ?
              <div className="p-7">
                <div className="mb-5 font-medium text-dark dark:text-white">
                  {file.name}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex items-center justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    onClick={() => {handleUpload(file)}}
                  >
                    Save
                  </button>
                </div>
              </div> :
              <div className="p-7">
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-4 bg-gray-2 px-4 py-4 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary sm:py-7.5"
                >
                  <input
                    type="file"
                    name="pdfData"
                    id="pdfData"
                    accept="application/pdf"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4613 2.07827C10.3429 1.94876 10.1755 1.875 10 1.875C9.82453 1.875 9.65714 1.94876 9.53873 2.07827L6.2054 5.7241C5.97248 5.97885 5.99019 6.37419 6.24494 6.6071C6.49969 6.84002 6.89502 6.82232 7.12794 6.56756L9.375 4.10984V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V4.10984L12.8721 6.56756C13.105 6.82232 13.5003 6.84002 13.7551 6.6071C14.0098 6.37419 14.0275 5.97885 13.7946 5.7241L10.4613 2.07827Z"
                          fill="#5750F1"
                        />
                        <path
                          d="M3.125 12.5C3.125 12.1548 2.84518 11.875 2.5 11.875C2.15482 11.875 1.875 12.1548 1.875 12.5V12.5457C1.87498 13.6854 1.87497 14.604 1.9721 15.3265C2.07295 16.0765 2.2887 16.7081 2.79029 17.2097C3.29189 17.7113 3.92345 17.9271 4.67354 18.0279C5.39602 18.125 6.31462 18.125 7.45428 18.125H12.5457C13.6854 18.125 14.604 18.125 15.3265 18.0279C16.0766 17.9271 16.7081 17.7113 17.2097 17.2097C17.7113 16.7081 17.9271 16.0765 18.0279 15.3265C18.125 14.604 18.125 13.6854 18.125 12.5457V12.5C18.125 12.1548 17.8452 11.875 17.5 11.875C17.1548 11.875 16.875 12.1548 16.875 12.5C16.875 13.6962 16.8737 14.5304 16.789 15.1599C16.7068 15.7714 16.5565 16.0952 16.3258 16.3258C16.0952 16.5565 15.7714 16.7068 15.1599 16.789C14.5304 16.8737 13.6962 16.875 12.5 16.875H7.5C6.30382 16.875 5.46956 16.8737 4.8401 16.789C4.22862 16.7068 3.90481 16.5565 3.67418 16.3258C3.44354 16.0952 3.29317 15.7714 3.21096 15.1599C3.12633 14.5304 3.125 13.6962 3.125 12.5Z"
                          fill="#5750F1"
                        />
                      </svg>
                    </span>
                    <p className="mt-2.5 text-body-sm font-medium">
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1 text-body-xs">
                      PDF
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default DataManagementBox;
