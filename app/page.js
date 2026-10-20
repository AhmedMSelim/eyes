import Image from "next/image";
import Slider from "./Slider";
import Login from "./login/page";
import New from "./New/page";

export default function Home() {
  return (
    <div>
      <div className="w-full text-center"></div>
      <Login />
    </div>
  );
}
