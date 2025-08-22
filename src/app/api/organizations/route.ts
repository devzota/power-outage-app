import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://cskh-api.cpc.vn/api/remote/organizations?maDonViCapTren=PP', {
      headers: {
        'Origin': 'https://cskh.cpc.vn',
        'Referer': 'https://cskh.cpc.vn/',
        'User-Agent': 'Mozilla/5.0 (compatible; PowerOutageApp/1.0)',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Organizations API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' }, 
      { status: 500 }
    );
  }
}