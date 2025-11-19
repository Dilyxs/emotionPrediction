"use client";
import { useContext } from "react";
import { Header } from "../Home/header";
import { EmotionGraph } from "./EmotionGraph";
import { Journal } from "./Journal";
import { Historycontext } from "../context/historycontext";
type emotiontotal = {
  [key: string]: number;
};
export default function page() {
  const { historydata: historydata, sethistorydata: sethistorydata } =
    useContext(Historycontext)!;
  const emotiondata = historydata.map((emotion: any) => {
    return JSON.parse(emotion);
  });
  let data: emotiontotal = {};

  data = emotiondata.reduce(
    (accumulator: emotiontotal, emotion: emotiontotal) => {
      for (let i = 0; i < Object.keys(emotion).length; i++) {
        let emotionname: string = Object.keys(emotion)[i];
        if (!accumulator.hasOwnProperty(emotionname)) {
          accumulator[emotionname] = emotion[emotionname];
        } else {
          accumulator[emotionname] += emotion[emotionname];
        }
      }
      return accumulator;
    },
    {},
  );
  console.log(data);

  return (
    <div className="bg-white h-screen w-screen">
      <Header directory="/" word="Home"></Header>
      <div className=" bg-white flex flex-row justify-center items-center gap-y-8">
        <h1 className="text-gray-800 text-3xl">
          Your Emotional Trend
          <br />
        </h1>
      </div>
      <EmotionGraph data={emotiondata} />
      <Journal></Journal>
    </div>
  );
}
