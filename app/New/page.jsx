"use client";

import { useState } from "react";

export default function New() {
  const [search, setSearch] = useState("");

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f6fa] p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm px-6 py-4 flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          عيادة النور — لوحة التحكم
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <button className="hover:bg-gray-100 p-2 rounded-full">🔔</button>
          <button className="hover:bg-gray-100 p-2 rounded-full">⚙️</button>
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center font-bold">
            د.س
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search + 2 Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مريض، موعد، أو ملف..."
              className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white"
            />
          </div>
          <button className="bg-[#5b7cfa] hover:bg-[#4a6ae8] text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition">
            <span className="text-xl">+</span> حجز جديد
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition">
            إضافة مريض +
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-8">تسجيل مريض جديد</h2>

            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <label className="md:w-32 font-semibold">الاسم الكامل</label>
                <input
                  placeholder="أدخل اسم المريض"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <label className="md:w-32 font-semibold">رقم الهاتف</label>
                <input
                  placeholder="05XXXXXXX"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <label className="md:w-32 font-semibold">التخصص المطلوب</label>
                <select className="flex-1 border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none">
                  <option>اختر التخصص</option>
                  <option>طب أسنان</option>
                  <option>جلدية</option>
                  <option>عظام</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">تاريخ الموعد</label>
                <input
                  type="date"
                  defaultValue="2025-10-22"
                  className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition">
                  إلغاء
                </button>
                <button className="flex-[2] bg-[#5b7cfa] hover:bg-[#4a6ae8] text-white font-bold py-3 rounded-xl transition">
                  حفظ التسجيل
                </button>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">ملخص اليوم</h2>
            <div className="space-y-5 text-gray-800">
              <div>
                <p className="font-bold">المواعيد اليوم</p>
                <p className="text-lg">12 موعد</p>
                <p className="text-sm text-gray-500">
                  4 مؤكدة · 3 قيد الانتظار
                </p>
              </div>
              <div>
                <p className="font-bold">المرضى الجدد</p>
                <p className="text-lg">5 مرضى</p>
                <p className="text-sm text-green-600">↑ عن الأمس 2+</p>
              </div>
              <div>
                <p className="font-bold">الإيرادات اليوم</p>
                <p className="text-lg font-bold">1,450 ر.س</p>
                <p className="text-sm text-gray-500">مكتمل: 8 فواتير</p>
              </div>
              <hr />
              <h3 className="font-bold text-xl">المواعيد القادمة</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                <p>• سارة أحمد — 10:30 صباحاً</p>
                <p>• محمد علي — 11:15 صباحاً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
