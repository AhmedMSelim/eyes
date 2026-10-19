import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. إعداد المصادقة باستخدام Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // معرف الشيت من الرابط

    const sourceSheet = "nasser"; // اسم الشيت المصدر (الذي سننقل منه)
    const targetSheet = "data"; // اسم الشيت الهدف (الذي سننقل إليه)

    // 2. جلب البيانات من الشيت الأول
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sourceSheet}!A:Z`,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "لا توجد بيانات لنقلها" },
        { status: 200 },
      );
    }

    // 3. جلب جميع الصفوف الموجودة حالياً في الشيت الهدف لمعرفة أول صف فارغ تماماً
    const targetResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${targetSheet}!A:Z`,
    });

    const targetRows = targetResponse.data.values || [];

    // تحديد رقم أول صف فاضي (إذا كان الشيت يحتوي على 5 صفوف مليئة، فأول صف فاضي هو الصف 6)
    const nextEmptyRow = targetRows.length + 1;

    // 3. إضافة البيانات إلى الشيت الثاني في آخر صف متاح
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${targetSheet}!A${nextEmptyRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rows,
      },
    });

    // 4. مسح محتوى الشيت الأول بالكامل
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sourceSheet}!A2:H`,
    });

    return NextResponse.json({
      success: true,
      message: "تم نقل البيانات ومسحها بنجاح!",
    });
  } catch (error) {
    console.error("خطأ أثناء نقل البيانات:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
