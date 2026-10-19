import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json(
      { success: false, message: "رقم الهاتف مطلوب" },
      { status: 400 },
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // قراءة كافة الصفوف من الشيت
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "data!A:H", // اسم الشيت الخاص بك والنطاق
    });

    const rows = response.data.values || [];
    const searchPhone = phone.trim();

    // البحث عن كل الصفوف التي تحتوي على هذا الرقم (في أي عمود أو في عمود الهاتف المحدد)
    const results = [];
    rows.forEach((row, index) => {
      // يفترض أن رقم الهاتف في العمود index 3 (العمود الرابع)
      const phoneInRow = row[3] ? String(row[3]).trim() : "";
      if (phoneInRow.includes(searchPhone)) {
        results.push({
          originalIndex: index, // رقم الصف الفعلي في المصفوفة
          row: row,
        });
      }
    });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error searching in Google Sheet:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء البحث في الشيت" },
      { status: 500 },
    );
  }
}
