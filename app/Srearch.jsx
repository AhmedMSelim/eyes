import React, { useEffect, useRef, useState } from "react";

export default function Srearch() {
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchContainerRef = useRef(null);

  // دالة البحث بالربط المباشر مع API الجوجل شيت
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    setSearchLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `/api/search?phone=${encodeURIComponent(searchPhone.trim())}`,
      );
      const result = await res.json();

      if (result.success) {
        setSearchResults(result.results);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // إذا كانت الضغطة خارج الحاوية searchContainerRef
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setHasSearched(false); // إخفاء النتائج فوراً
      }
    };

    // ربط الحدث على مستوى المستند بالكامل
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={searchContainerRef}
      className="relative w-fit my-6 p-4 border rounded-xl shadow-sm bg-gray-50"
    >
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="tel"
          value={searchPhone}
          onChange={(e) => {
            const val = e.target.value;
            setSearchPhone(val);

            // إذا أصبح حقل البحث فارغاً، قم بإخفاء النتائج وتصفيرها فوراً
            if (!val.trim()) {
              setSearchResults([]);
              setHasSearched(false);
            }
          }}
          onFocus={() => {
            // لو فيه نتائج قديمة وحب يرجع يدوس جوه الـ input تظهر تاني
            if (searchResults.length > 0) setHasSearched(true);
          }}
          placeholder="أدخل رقم الهاتف للبحث..."
          className="p-2 border border-gray-300 rounded-md flex-1 text-right"
        />
        <button
          type="submit"
          disabled={searchLoading}
          className="bg-green-600 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {searchLoading ? "جاري ..." : "بحث"}
        </button>
      </form>

      {/* عرض النتائج القادمة مباشرة من الجوجل شيت */}
      {hasSearched && (
        <div className="mt-4 space-y-2 absolute top-15 w-full left-0">
          {searchResults.length > 0
            ? searchResults.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-white border border-green-200 rounded-md flex justify-between items-center text-sm shadow-sm"
                >
                  <div>
                    <span>{item.row.join(" | ")}</span>
                  </div>
                </div>
              ))
            : !searchLoading && (
                <p className="text-red-500 text-sm mt-2 font-semibold">
                  لم يتم العثور على أي تسجيلة بهذا الرقم في الشيت!
                </p>
              )}
        </div>
      )}
    </div>
  );
}
