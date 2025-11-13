import { FaHistory } from "react-icons/fa";
export const Header = (props: {}) => {
  return (
    <div className="flex flex-row  w-full justify-between ">
      <p className="font-bold text-sky-500">Adsayan Inc</p>
      <div className="flex flex-row p-1.5">
        <FaHistory className="text-sky-500 "></FaHistory>
        <p className="font-bold text-sky-500"> History</p>
      </div>
    </div>
  );
};
