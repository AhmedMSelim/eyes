"use client";

import { useEffect, useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState(false);
  const [tagmoo, setTagmoo] = useState(false);

  /**
   * حساب وقت حضور المريض بناءً على ترتيبة في الحجز
   * @param {number} queueNumber - رقم حجز المريض (1, 2, 3...)
   * @param {string} startTimeStr - وقت بداية العيادة بصيغة "HH:MM" (افتراضي 19:00)
   * @param {number} intervalMinutes - الوقت المخصص لكل مريض بالدقائق (افتراضي 15)
   */

  function calculateAppointmentTime(
    number,
    startTimeStr = "19:00",
    intervalMinutes = 15,
  ) {
    const [startHours, startMinutes] = startTimeStr.split(":").map(Number);

    // إنشاء كائن تاريخ لحساب الوقت بسهولة
    const date = new Date();
    date.setHours(startHours, startMinutes, 0, 0);

    // إضافة الموعد بناءً على رقم الحجز
    const addedMinutes = (number - 1) * intervalMinutes;
    date.setMinutes(date.getMinutes() + addedMinutes);

    // تنسيق الوقت للعرض باللغة العربية (مثال: 07:15 م)
    return date.toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  const date = calculateAppointmentTime(number);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (contact) {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.message === "Success") {
          setName(result.userName);
          setAge(result.age);
          setNumber(result.clientNumber);
          setPhone(result.phone);
          setSuccess(`Booking confirmed successfully.`);
          setFormData({
            name: "",
            age: "",
            subject: "",
            message: "",
            phone: "",
          });
        } else {
          setError("An error occurred during transmission.");
        }
      } catch (error) {
        setError("Sorry, unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    } else if (tagmoo) {
      try {
        const response = await fetch("/api/nasser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.message === "Success") {
          setName(result.userName);
          setAge(result.age);
          setNumber(result.clientNumber);
          setPhone(result.phone);
          setSuccess(`تم الحجز بنجاح`);
          setFormData({
            name: "",
            age: "",
            subject: "",
            message: "",
            phone: "",
          });
        } else {
          setError("حدث خطأ أثناء الإرسال.");
        }
      } catch (error) {
        setError("عفواً، تعذر الاتصال بالسيرفر.");
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * Checks clinic status for today based on working days (Sunday & Monday).
   */
  function getTodayClinicStatus() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, 4 = Thursday...

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDayName = days[dayOfWeek];

    // Clinic is open on Sunday (0) and Monday (1) only
    const isOpenToday = dayOfWeek === 0 || dayOfWeek === 4;

    return {
      todayName: currentDayName,
      isOpen: isOpenToday,
      message: isOpenToday
        ? `The clinic is open today (${currentDayName}). Appointments available starting from 7:00 PM.`
        : `The clinic is closed today (${currentDayName}). Working days are Sunday and Monday only.`,
    };
  }

  const { isOpen, message } = getTodayClinicStatus();

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
      <div className={`${isOpen ? "text-green-600" : "text-red-600"}`}>
        {message}
      </div>
      <div className="w-fit mx-auto text-center py-5">
        <button
          onClick={() => {
            (setContact(!contact), setTagmoo(false));
          }}
          className={` p-3 rounded-2xl ${contact ? "bg-blue-500" : "bg-green-400"}`}
        >
          Nasser City
        </button>
        <button
          onClick={() => {
            (setContact(false), setTagmoo(!tagmoo));
          }}
          className={`ms-3 p-3 rounded-2xl  ${tagmoo ? "bg-blue-500" : "bg-green-400"}`}
        >
          Tagamoa
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

        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter Your Subject"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
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
            required
            placeholder="Enter Your Meassage"
            className="input-field placeholder:text-gray-500 placeholder:italic border border-gray-300 rounded-md"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isOpen}
          style={{
            padding: "10px",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading || !isOpen ? "not-allowed" : "pointer",
          }}
          className={`w-full ${loading || !isOpen ? "bg-gray-400" : "bg-blue-500"} text-white font-bold py-2 px-4 rounded`}
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
            {success}✅
          </p>
          <div className="w-full p-5 rounded-2xl bg-gray-300">
            <div className="text-center text-2xl text-blue-600">
              {tagmoo ? "Tagmoo" : "Nasser"}
            </div>
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
              Inspection Number is:
              <span className="ps-1 font-medium">{number}</span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              Date:
              <span className="ps-1 font-medium">
                {new Date().toLocaleString("en-US", {
                  timeZone: "Africa/Cairo",
                  dateStyle: "short",
                  timeStyle: "medium",
                })}
              </span>
            </div>
            <div className="font-bold text-xl md:text-2xl py-2">
              The Appointment is:
              <span className="ps-1 font-medium">{date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
