"use client";
import { useRouter } from "next/navigation";
type words = {
  word: string;
  directory: string;
};
import { FaHistory } from "react-icons/fa";

export const Header = ({ word, directory }: words) => {
  const rounter = useRouter();
  return (
    <div className="flex flex-row  w-full justify-between ">
      <p className="font-bold text-sky-500">Adsayan Inc</p>
      <div
        className="flex flex-row p-1.5"
        onClick={(e) => {
          rounter.push(directory);
        }}
      >
        <FaHistory className="text-sky-500 "></FaHistory>
        <p className="font-bold text-sky-500"> {word}</p>
      </div>
    </div>
  );
};
