import Image from "next/image";
import Slider from "./Slider";
import Login from "./login/page";

export default function Home() {
  return (
    <div>
      <div className="w-full text-center">
        <Slider />
        <h1 className="text-blue-600 text-3xl md:text-5xl font-bold py-5">
          افضل دكتور عيون في مصر
        </h1>
        <p className="text-xl md:text-3xl font-bold">للحجز من هنا</p>
      </div>
      <Login />
    </div>
  );
}
