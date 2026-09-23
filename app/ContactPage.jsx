"use client";

import { useState } from "react";

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

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
  };

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
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
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
          </div>
        </div>
      )}
    </div>
  );
}
