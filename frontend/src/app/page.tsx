"use client";
import { useContext, useState } from "react";
import { GetInput } from "./Home/getinput";
import { Header } from "./Home/header";
import { PickInputType } from "./Home/pickinputtype";
import { ClickAnalyzeEmotion } from "./helperfunc";
import { DisplayEmotions } from "./history/DisplayEmotions";
import { Historycontext } from "./context/historycontext";

export default function Home() {
  const [inputtype, setinputtype] = useState("image");
  const [data, setdata] = useState<string | File | undefined>(undefined);

  const { historydata: history, sethistorydata: sethistory } =
    useContext(Historycontext)!;
  const [displayEmotion, setdisplayEmotion] = useState(false);

  return (
    <div>
      {displayEmotion && (
        <div>
          <DisplayEmotions
            setdisplayEmotion={setdisplayEmotion}
            history={history}
          ></DisplayEmotions>
        </div>
      )}
      <div className="flex flex-col bg-white min-h-screen p-6 gap-y-8">
        <Header directory="/history" word="History" />

        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            How Are You Feeling
            <br />
            Right Now?
          </h1>
          <GetInput inputtype={inputtype} data={data} setdata={setdata} />
          <PickInputType setinputtype={setinputtype} />
          <button
            onClick={async (e) => {
              if (data instanceof File) {
                const response = await ClickAnalyzeEmotion(data);
                setdata(undefined);
                sethistory([...history, response]);
                setdisplayEmotion(true);
                console.log(history);
              }
            }}
            className="bg-white text-gray-900 font-bold rounded-full border-2 border-blue-500 py-3 px-20 hover:bg-gray-100"
          >
            Analyze Emotion
          </button>
        </div>
      </div>
    </div>
  );
}
