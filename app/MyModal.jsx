"use client";

import { Button } from "@heroui/react";

import { useState } from "react";
import CustomModal from "./CustomModal";

export default function MyModal({ info, handleMoveData }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* زر الفتح باستخدام HeroUI */}
      <Button
        className="p-3 rounded-2xl cursor-pointer bg-blue-500 text-white"
        color="secondary"
        onPress={() => setIsOpen(true)}
      >
        End Day
      </Button>

      {/* المودال المخصص لـ Next.js */}
      <CustomModal
        handleMoveData={handleMoveData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="End Day"
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {info?.map((row, rowIndex) => (
          <span key={rowIndex} className="flex justify-between">
            {row?.map((cell, cellIndex) => (
              <span
                key={cellIndex}
                className="text-2xl border-gray-300 px-4 py-2 text-gray-700"
              >
                {cell || "-"}
              </span>
            ))}
          </span>
        ))}
      </CustomModal>
    </div>
  );
}
