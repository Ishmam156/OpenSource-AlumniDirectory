import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Alumni } from '@/types';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || ''),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const batch = searchParams.get('batch');
    const country = searchParams.get('country');
    const organization = searchParams.get('organization');

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Summary!A2:G', // Assuming first row is header
    });

    const rows = response.data.values || [];
    let alumni: Alumni[] = rows.map(row => ({
      batch: parseInt(row[0]),
      studentName: row[1],
      countryOfResidence: row[2],
      currentRole: row[3],
      roleFunction: row[4],
      organization: row[5],
      linkedinUrl: row[6]
    }));

    // Apply filters
    if (name) {
      const searchName = name.toLowerCase();
      alumni = alumni.filter(a => 
        a.studentName.toLowerCase().includes(searchName)
      );
    }

    if (batch) {
      alumni = alumni.filter(a => a.batch === parseInt(batch));
    }

    if (country) {
      const searchCountry = country.toLowerCase();
      alumni = alumni.filter(a => 
        a.countryOfResidence?.toLowerCase().includes(searchCountry)
      );
    }

    if (organization) {
      const searchOrg = organization.toLowerCase();
      alumni = alumni.filter(a => 
        a.organization?.toLowerCase().includes(searchOrg)
      );
    }

    // Sort by batch number and then by student name within each batch
    alumni.sort((a, b) => {
      if (a.batch !== b.batch) {
        return a.batch - b.batch;
      }
      return a.studentName.localeCompare(b.studentName);
    });

    return NextResponse.json(alumni);
  } catch (error) {
    console.error('Error fetching alumni data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alumni data' },
      { status: 500 }
    );
  }
}