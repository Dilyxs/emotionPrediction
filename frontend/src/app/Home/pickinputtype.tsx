import { IoMdText } from "react-icons/io";

import { FaRegImage } from "react-icons/fa6";
type SetInputType = {
  setinputtype: any;
};
export const PickInputType = ({ setinputtype }: SetInputType) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <IoMdText
        className="w-auto h-12 text-sky-500 "
        onClick={(e) => {
          setinputtype("text");
        }}
      />
      <FaRegImage
        className="w-auto h-12 text-sky-500"
        onClick={(e) => {
          setinputtype("image");
        }}
      />
    </div>
  );
};
