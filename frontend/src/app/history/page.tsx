import { Header } from "../Home/header";
import { DisplayEmotions } from "./DisplayEmotions";
import { Journal } from "./Journal";

export default function page() {
  return (
    <div className="bg-white h-screen w-screen">
      <Header directory="/" word="Home"></Header>
      <div className=" bg-white flex flex-row justify-center items-center gap-y-8">
        <h1 className="text-gray-800 text-3xl">
          Your Emotional Trend
          <br />
        </h1>
      </div>
      <Journal></Journal>
    </div>
  );
}
