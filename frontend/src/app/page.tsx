"use client";
import { useState } from "react";
import { GetInput } from "./Home/getinput";
import { Header } from "./Home/header";
import { PickInputType } from "./Home/pickinputtype";

export default function Home() {
  const [inputtype, setinputtype] = useState("image");

  return (
    <div className="flex flex-col bg-white min-h-screen p-6 gap-y-8">
      <Header />
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          How Are You Feeling
          <br />
          Right Now?
        </h1>
        <GetInput inputtype={inputtype} />
        <PickInputType setinputtype={setinputtype} />
        <button className="bg-white text-gray-900 font-bold rounded-full border-2 border-blue-500 py-3 px-20 hover:bg-gray-100">
          Analyze Emotion
        </button>
      </div>
    </div>
  );
}
