import Image from "next/image";
import ContactPage from "./ContactPage";

export default function Home() {
  return (
    <div>
      <div className="w-fit text-center mx-auto">
        <h1 className="text-blue-600 text-3xl md:text-5xl font-bold py-5">
          افضل دكتور عيون في مصر
        </h1>
        <p className="text-xl md:text-3xl font-bold py-2">للحجز من هنا</p>
      </div>
      <ContactPage />
    </div>
  );
}
