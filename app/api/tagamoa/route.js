import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, age, subject, message, phone } = await req.json();

    const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
    const privateKey = rawKey.replace(/^"|"$/g, "").replace(/\\n/g, "\n");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "tagamoa!B:B",
    });

    const existingRows = getRows.data.values || [];
    const newClientId = existingRows.length;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "tagamoa!B:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            newClientId,
            name,
            age,
            subject,
            message,
            phone,
            new Date().toLocaleString("en-US", {
              timeZone: "Africa/Cairo",
              dateStyle: "short",
              timeStyle: "medium",
            }),
          ],
        ],
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        clientNumber: newClientId,
        userName: name,
        age: age,
        phone: phone,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding row to Google Sheets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
