import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // استبدال الرموز الخاصة بالسطور الجديدة لتعمل المفاتيح بشكل صحيح
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    const response1 = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "tagamoa!A:H",
    });
    const response2 = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "tagamoa!J:K",
    });

    return Response.json({
      data: response1.data.values || [],
      info: response2.data.values || [],
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch sheet data", message: error.message },
      { status: 500 },
    );
  }
}
