// components/Table.jsx (أو مسار ملف الجدول لديك)
"use client";
import { FaEdit } from "react-icons/fa";

export default function Table({ data = [] }) {
  // التأكد من وجود بيانات
  if (!data || data.length === 0) {
    return (
      <div className="w-[85%] mx-auto my-8 text-center text-gray-500">
        لا توجد بيانات للعرض حالياً.
      </div>
    );
  }

  // فصل عناوين الجدول من الصف الأول وباقي البيانات
  const headers = data[0] || [];
  const rows = data.length > 1 ? data.slice(1) : [];

  return (
    <div className="w-[95%] md:w-[80%] mx-auto my-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">جدول البيانات</h2>
      <table className="min-w-full border-collapse border border-gray-300 text-right">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 font-bold text-gray-800"
              >
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2 text-gray-700"
                >
                  {cell || "-"}
                </td>
              ))}
              <td className="border w-full cursor-pointer flex  justify-center border-gray-300 px-4 py-3 font-bold text-gray-800">
                <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
