import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || ''),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Summary!A2:G', // Excluding header row
    });

    const rows = response.data.values || [];
    
    // Extract and process unique values
    const batches = [...new Set(rows
      .map(row => parseInt(row[0]))
      .filter(batch => !isNaN(batch)))] // Remove NaN values
      .sort((a, b) => a - b); // Sort numerically

    const countries = [...new Set(rows
      .map(row => row[2])
      .filter(country => country && country.trim()))] // Remove empty/null values
      .sort();

    const organizations = [...new Set(rows
      .map(row => row[5])
      .filter(org => org && org.trim()))] // Remove empty/null values
      .sort();

    return NextResponse.json({
      batches,
      countries,
      organizations
    });
  } catch (error) {
    console.error('Error fetching dropdown options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dropdown options' },
      { status: 500 }
    );
  }
}