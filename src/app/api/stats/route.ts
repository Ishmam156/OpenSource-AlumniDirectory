import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { SearchStats } from '@/types';

export async function GET() {
  try {
    const result = await sql`
      SELECT total_searches FROM search_stats WHERE id = 1;
    `;

    const stats: SearchStats = {
      totalSearches: result.rows[0]?.total_searches || 0
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching search stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search stats' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await sql`
      INSERT INTO search_stats (id, total_searches)
      VALUES (1, 1)
      ON CONFLICT (id)
      DO UPDATE SET total_searches = search_stats.total_searches + 1;
    `;

    return NextResponse.json({ message: 'Search count updated successfully' });
  } catch (error) {
    console.error('Error updating search stats:', error);
    return NextResponse.json(
      { error: 'Failed to update search stats' },
      { status: 500 }
    );
  }
}