"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Cairo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    price: "",
    message: "",
    visitType: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [visitType, setVisitType] = useState("");
  const [price1, setPrice1] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token !== "newCairo") {
        router.back();
      }
    }
  }, [router]);

  // حساب السعر مباشرة بناءً على الاختيار الحالي في formData
  const price =
    formData.visitType === "كشف"
      ? 500
      : formData.visitType === "استشارة"
        ? 200
        : formData.visitType === "متابعة"
          ? 0
          : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // إرسال البيانات مع السعر المحسوب مباشرة
    const payload = { ...formData, price };

    try {
      const response = await fetch("/api/nasser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.message === "Success") {
        console.log(result);
        setName(result.userName);
        setAge(result.age);
        setNumber(result.clientNumber);
        setPhone(result.phone);
        setVisitType(result.visitType);
        setPrice1(result.price);

        const currentDate = new Date().toLocaleString("en-US", {
          timeZone: "Africa/Cairo",
          dateStyle: "short",
          timeStyle: "medium",
        });
        setDate(currentDate);

        setSuccess(`Booking confirmed successfully. ✅`);
        setFormData({
          name: "",
          age: "",
          price: "",
          message: "",
          phone: "",
          visitType: "",
        });
      } else {
        setError("An error occurred during transmission.");
      }
    } catch (error) {
      setError("Sorry, unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  function logout() {
    localStorage.removeItem("userToken");
    router.back();
  }

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
      className="w-[85%] md:w-[30%]"
    >
      <div className="w-fit mx-auto py-5 text-center">
        {error && (
          <p style={{ marginTop: "15px", fontWeight: "bold", color: "red" }}>
            {error}
          </p>
        )}
      </div>
      <div className={"text-green-600 text-4xl"}>New Cairo</div>
      <div className="w-fit mx-auto text-center py-5">
        <button
          type="button"
          onClick={() => logout()}
          className={`absolute ms-3 p-3 top-5 right-3 rounded-2xl bg-blue-500 text-white`}
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Your Name"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter Your Age"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter Your Phone"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        {/* قائمة الخيارات */}
        <div>
          <label>Visit Type:</label>
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="">اختر نوع الزيارة...</option>
            <option value="كشف">كشف</option>
            <option value="استشارة">استشارة</option>
            <option value="متابعة">متابعة</option>
          </select>
        </div>

        {/* حقل السعر الذي يعرض المتغير الحسابي مباشرة */}
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            readOnly
            placeholder="0"
            className="border border-gray-300 rounded-md bg-gray-100 font-bold text-lg text-green-700"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Enter Your Meassage"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          className={`w-full ${loading ? "bg-gray-400" : "bg-blue-500"} text-white font-bold py-2 px-4 rounded`}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      {success && (
        <div className="w-full mx-auto">
          <p
            style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}
            className="py-5 text-2xl text-center"
          >
            {success}
          </p>
          <div className="w-full p-5 rounded-2xl bg-gray-300">
            <div className="font-bold text-xl md:text-2xl py-2">
              Your Name is: <span className="ps-1 font-medium">{name}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Your Age is: <span className="ps-1 font-medium">{age}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Your Phone is: <span className="ps-1 font-medium">{phone}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Visit Type: <span className="ps-1 font-medium">{visitType}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Price: <span className="ps-1 font-medium">{price1}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Inspection Number is:
              <span className="ps-1 font-medium">{number}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Date:
              <span className="ps-1 font-medium">{date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
