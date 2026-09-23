"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setSuccess(
          `  تم الحجز بنجاح رقم الطلب هو (${result.clientNumber})     ${result.userName}        `,
        );
        setFormData({
          name: "",
          email: "",
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
        maxWidth: "400px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Your Email"
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
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>
          {success}
        </p>
      )}
      {error && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}
