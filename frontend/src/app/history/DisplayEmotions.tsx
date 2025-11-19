"use client";

import { useState } from "react";

type DisplayEmotion = {
  setdisplayEmotion: any;
  history: any;
};

const getEmotionDetails = (
  emotion: string,
): { name: string; emoji: string; color: string } => {
  switch (emotion.toLowerCase()) {
    case "happy":
      return { name: "Joy", emoji: "😊", color: "bg-green-500" };
    case "anger":
      return { name: "Anger", emoji: "😠", color: "bg-red-500" };
    case "sad":
      return { name: "Sadness", emoji: "😥", color: "bg-blue-500" };
    case "neutral":
      return { name: "Neutral", emoji: "✨", color: "bg-gray-400" };
    case "contempt":
      return { name: "Contempt", emoji: "😒", color: "bg-purple-500" };
    case "surprise":
      return { name: "Surprise", emoji: "😮", color: "bg-yellow-500" };
    case "fear":
      return { name: "Fear", emoji: "😨", color: "bg-indigo-500" };
    case "disgust":
      return { name: "Disgust", emoji: "🤢", color: "bg-lime-500" };
    default:
      return { name: emotion, emoji: "❓", color: "bg-yellow-500" };
  }
};

export const DisplayEmotions = (props: DisplayEmotion) => {
  const [feedback, setfeedback] = useState(false);
  const lastEmotion = JSON.parse(props.history[props.history.length - 1]);

  console.log(lastEmotion);
  const emotions = Object.keys(lastEmotion).map((emotion, key) => ({
    emotion: emotion,
    probability: lastEmotion[emotion],
  }));
  const sortedEmotions = emotions;

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="flex flex-col max-w-sm w-full p-8 shadow-2xl bg-white border-2 border-sky-300 rounded-xl">
        <p className="text-xl font-bold text-gray-700 mb-6">
          We've analyzed your
          <br />
          thoughts:
        </p>

        <div className="flex flex-col space-y-3 mb-6">
          {sortedEmotions.map((item, index) => {
            const percentageValue = item.probability;
            const widthValue = percentageValue * 100;
            const formattedPercentage = `${widthValue.toFixed(1)}%`;

            const { name, emoji, color } = getEmotionDetails(item.emotion);

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="w-1/4 flex items-center">
                  <span className="mr-2 text-lg">{emoji}</span>
                  <h1 className="font-semibold text-gray-800 capitalize gap-x-5">
                    {name}
                  </h1>
                </div>
                <div className="w-2/4 relative h-4 bg-gray-200 rounded-full ml-9 overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(widthValue, 1)}%` }}
                  ></div>
                </div>

                <p className="w-1/4 text-right font-medium text-gray-600">
                  {formattedPercentage}
                </p>
              </div>
            );
          })}
        </div>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm mb-3 text-gray-600">
            Was this accurate?
          </p>
          {feedback ? (
            <div className="flex justify-center space-x-4 mb-3">
              <p className="text-sm  text-gray-800">
                {" "}
                Thank you for the feedback ;)
              </p>
            </div>
          ) : (
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={(e) => {
                  setfeedback(true);
                }}
                className="px-6 py-2 text-sm border border-gray-300 rounded-full text-blue-600 hover:bg-blue-50"
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  setfeedback(true);
                }}
                className="px-6 py-2 text-sm border border-gray-300 rounded-full text-blue-600 hover:bg-blue-50"
              >
                No
              </button>
            </div>
          )}

          <button
            className="w-full py-3 text-white font-bold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
            onClick={() => props.setdisplayEmotion(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
