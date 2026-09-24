import Image from "next/image";
import ContactPage from "./ContactPage";
import Slider from "./Slider";

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
      <ContactPage />
    </div>
  );
}
