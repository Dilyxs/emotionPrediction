import { Header } from "../Home/header";
import { DisplayEmotions } from "./DisplayEmotions";
import { Journal } from "./Journal";

export default function page() {
  return (
    <div>
      <Header word="Home"></Header>
      <div className="flex flex-row justify-center items-center gap-y-8">
        <p className="font-black ">
          Your Emotional Trend
          <br />
          (Last Emotions)
        </p>
      </div>
      <DisplayEmotions></DisplayEmotions>
      <Journal></Journal>
    </div>
  );
}
