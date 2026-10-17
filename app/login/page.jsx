"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // إذا كنت تستخدم Next.js (App Router)

export default function Login() {
  const router = useRouter();

  // 1. تعريف الأوبجكت أو المصفوفة التي تحتوي على بيانات العيادتين
  const clinicsData = {
    clinic1: {
      location: "newCairo",
      username: "user1",
      password: "123",
      name: "عيادة مصر الجديدة",
      dashboardUrl: "/cairo", // صفحة العيادة الأولى
    },
    clinic2: {
      location: "Tagamoaa",
      username: "user2",
      password: "456",
      name: "عيادة التجمع",
      dashboardUrl: "/tagamoaa", // صفحة العيادة الثانية
    },
  };

  // 2. الحالات (States) لحفظ المدخلات ورسائل الخطأ
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 3. دالة التحقق عند الضغط على زر الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // البحث في الأوبجكت عما إذا كان اسم المستخدم موجوداً
    const matchedClinic = Object.values(clinicsData).find(
      (clinic) => clinic.username === username && clinic.password === password,
    );

    if (matchedClinic) {
      // حفظ بيانات العيادة في المتصفح إذا احتجت لها لاحقاً
      localStorage.setItem("userToken", matchedClinic.location);

      alert(`تم تسجيل الدخول بنجاح إلى: ${matchedClinic.name}`);

      // التوجيه للوحة التحكم الخاصة بالعيادة
      router.push(matchedClinic.dashboardUrl);
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          تسجيل دخول العيادات
        </h2>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              اسم المستخدم للعيادة
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ادخل اسم المستخدم"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}
