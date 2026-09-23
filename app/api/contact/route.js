import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, subject, message, phone } = await req.json();

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

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!B:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name,
            email,
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

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error adding row to Google Sheets:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
