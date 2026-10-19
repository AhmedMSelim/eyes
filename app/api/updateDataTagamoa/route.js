import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // استقبال رقم الصف والبيانات المعدلة من الموقع
    const { rowIndex, updatedRowData } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const sourceSheet = "tagamoa";

    // حساب رقم الصف الفعلي في Google Sheets (نضيف 2 لتخطي صف العناوين Headers)
    const exactSheetRow = rowIndex + 2;

    // تحديث النطاق الخاص بهذا الصف فقط في Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sourceSheet}!B${exactSheetRow}:Z${exactSheetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRowData], // البيانات الجديدة المعدلة
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم تحديل الصف في الشيت بنجاح!",
    });
  } catch (error) {
    console.error("Error updating row:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
