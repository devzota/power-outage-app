import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const orgCode = searchParams.get('orgCode') || 'PP';
  const subOrgCode = searchParams.get('subOrgCode') || '';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  if (!subOrgCode) {
    return NextResponse.json(
      { error: 'subOrgCode is required' }, 
      { status: 400 }
    );
  }

  const apiUrl = `https://cskh-api.cpc.vn/api/remote/outages/area?${new URLSearchParams({
    orgCode,
    subOrgCode,
    fromDate,
    toDate,
    page,
    limit
  })}`;

  try {
    const response = await fetch(apiUrl, {
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
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Outages API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outages' }, 
      { status: 500 }
    );
  }
}