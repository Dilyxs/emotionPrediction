"use client";
import { IoIosCloudDownload } from "react-icons/io";
import { useState } from "react";

type GetInputType = {
  inputtype: string;
  data: any;
  setdata: any;
};
export const GetInput = ({ inputtype, data, setdata }: GetInputType) => {
  return (
    <div>
      {inputtype == "text" ? (
        <div>
          <textarea
            onChange={(e) => {
              setdata(e.target.value);
            }}
            className="bg-green-50"
          ></textarea>{" "}
        </div>
      ) : (
        <div>
          <div>
            <label className="font-bold text-2xl flex flex-col justify-center items-center">
              {data == null ? (
                <div className="font-bold text-2xl flex flex-col justify-center items-center">
                  {" "}
                  <p>insert your image!</p>
                  <IoIosCloudDownload></IoIosCloudDownload>
                </div>
              ) : (
                <div className="font-bold text-2xl flex flex-col justify-center items-center">
                  <p>Does this look good?</p>
                </div>
              )}
              <input
                onChange={(e: any) => {
                  let index: number = e.target.files.length - 1;
                  setdata(e.target.files[index]);
                }}
                className="hidden"
                type="file"
                accept="image/*"
              />
            </label>
            {data && data instanceof File && (
              <div className="flex flex-col justify-center items-center">
                <img src={URL.createObjectURL(data)} />
                <button
                  className="hover:bg-red-400 rounded-full"
                  onClick={(e) => {
                    setdata(undefined);
                  }}
                >
                  Change image!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
