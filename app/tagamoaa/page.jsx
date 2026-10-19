"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../Table";
import MyModal from "../MyModal";

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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token !== "Tagamoaa") {
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
    setError("");

    // إرسال البيانات مع السعر المحسوب مباشرة
    const payload = { ...formData, price };

    try {
      const response = await fetch("/api/tagamoa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.message === "Success") {
        router.refresh();
        window.location.reload();
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

  // app/page.js
  useEffect(() => {
    async function getData() {
      try {
        // تأكد من أن المسار يطابق مجلد الـ API الفعلي لديك (مثلاً /api/sheet)
        const res = await fetch("/api/getTagamoa");

        if (!res.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const data = await res.json();
        if (Array.isArray(data.data)) {
          setData(data.data);
        }
        if (Array.isArray(data.info)) {
          setInfo(data.info.slice(1));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  // End Get //

  const handleMoveData = async () => {
    try {
      const res = await fetch("/api/moveDataTagamoa", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        alert("تم نقل البيانات من الشيت ومسحها بنجاح!");
        // يمكنك عمل ريفرش للصفحة هنا إذا أردت
        window.location.reload();
      } else {
        alert("حدث خطأ: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("تعذر الاتصال بالسيرفر");
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
    <div>
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
        <div className={"text-green-600 text-4xl"}>Tagamoaa</div>
        <div className="absolute top-5 flex justify-between gap-3 right-5 text-center">
          {data.length > 1 && (
            <MyModal info={info} handleMoveData={handleMoveData} />
          )}
          <button
            type="button"
            onClick={() => logout()}
            className={`ms-3 p-3 rounded-2xl cursor-pointer bg-blue-500 text-white`}
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
              disabled
              placeholder="0"
              className="border border-gray-300 rounded-md bg-gray-100 font-bold text-lg"
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
      </div>
      {/* <Table data={data} /> */}
    </div>
  );
}
