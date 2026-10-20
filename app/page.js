import Image from "next/image";
import Slider from "./Slider";
import Login from "./login/page";
import New from "./New/page";

export default function Home() {
  return (
    <div>
      <div className="w-full text-center">
        <p className="text-xl md:text-3xl font-bold">تسجيل الدخول</p>
      </div>
      <Login />
    </div>
  );
}
