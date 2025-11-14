type words = {
  word: string;
};
import { FaHistory } from "react-icons/fa";
export const Header = ({ word }: words) => {
  return (
    <div className="flex flex-row  w-full justify-between ">
      <p className="font-bold text-sky-500">Adsayan Inc</p>
      <div className="flex flex-row p-1.5">
        <FaHistory className="text-sky-500 "></FaHistory>
        <p className="font-bold text-sky-500"> {word}</p>
      </div>
    </div>
  );
};
