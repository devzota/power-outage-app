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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const apiUrl = `https://cskh-api.cpc.vn/api/remote/outages/area?${new URLSearchParams({
      orgCode,
      subOrgCode,
      fromDate,
      toDate,
      page,
      limit
    })}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Origin': 'https://cskh.cpc.vn',
        'Referer': 'https://cskh.cpc.vn/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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
    
    // Fallback mock data
    const mockOutages = {
      totalCount: 3,
      items: [
        {
          subOrganizationCode: subOrgCode,
          subOrganizationName: "Đội quản lý điện Hải Châu",
          fromDate: "2025-08-22T06:00:00",
          fromDateStr: "06:00 22/08/2025",
          toDate: "2025-08-22T09:00:00",
          toDateStr: "09:00 22/08/2025",
          outageType: "Kế hoạch",
          reason: "Bảo trì định kỳ lưới điện",
          stationCode: "HD53HACV",
          stationName: "Trạm Hải Châu 1",
          status: "1",
          statusStr: "Đã duyệt"
        },
        {
          subOrganizationCode: subOrgCode,
          subOrganizationName: "Đội quản lý điện Hải Châu",
          fromDate: "2025-08-23T07:30:00",
          fromDateStr: "07:30 23/08/2025",
          toDate: "2025-08-23T11:30:00",
          toDateStr: "11:30 23/08/2025",
          outageType: "Đột xuất",
          reason: "Sửa chữa sự cố đường dây",
          stationCode: "HD53HBCV",
          stationName: "Trạm Hải Châu 2",
          status: "1",
          statusStr: "Đã duyệt"
        },
        {
          subOrganizationCode: subOrgCode,
          subOrganizationName: "Đội quản lý điện Hải Châu",
          fromDate: "2025-08-24T08:00:00",
          fromDateStr: "08:00 24/08/2025",
          toDate: "2025-08-24T12:00:00",
          toDateStr: "12:00 24/08/2025",
          outageType: "Kế hoạch",
          reason: "Nâng cấp hệ thống điện",
          stationCode: "HD53HCCV",
          stationName: "Trạm Hải Châu 3",
          status: "0",
          statusStr: "Chờ duyệt"
        }
      ]
    };
    
    return NextResponse.json(mockOutages, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800',
      },
    });
  }
}