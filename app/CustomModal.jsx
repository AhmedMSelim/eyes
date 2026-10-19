"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Rocket } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  handleMoveData,
}) {
  const [mounted, setMounted] = useState(false);

  // التأكد من أن المكون يُعرض فقط بعد اكتمال التحميل في متصفح العميل (Client)
  useEffect(() => {
    setMounted(true);
  }, []);

  // التحكم في إغلاق المودال عند الضغط على زر Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden"; // منع التمرير الخلفي
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  // إرسال الـ Modal مباشرة إلى body لضمان ظهوره فوق جميع العناصر في Next.js
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* خلفية معتمة مع تأثير الضبابية (Backdrop) */}
      <div
        className="fixed inset-0 bg-white/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* نافذة الـ Modal نفسها */}
      <div className="relative z-10 w-full max-w-md scale-100 rounded-2xl bg-background p-6 shadow-2xl border border-divider transition-all">
        {/* زر الإغلاق X */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-default-400 hover:text-default-600 transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* الهيدر (Header) */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-default-100 text-foreground">
            <Rocket className="size-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {title || "Welcome"}
          </h3>
        </div>

        {/* المحتوى (Body) */}
        <div className="mb-6 text-sm text-default-500">{children}</div>

        {/* الفوتر / أزرار التحكم (Footer) */}
        <div className="flex justify-end gap-4">
          <Button
            className="cursor-pointer bg-amber-800 p-3 rounded-xl"
            variant="light"
            onPress={onClose}
          >
            إلغاء
          </Button>
          <Button
            className="cursor-pointer bg-amber-300 p-3 rounded-xl"
            onPress={handleMoveData}
          >
            تاكيد
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
