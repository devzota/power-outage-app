import { NextRequest, NextResponse } from 'next/server';
import { Outage } from '@/types/power-outage';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const orgCode = searchParams.get('orgCode') || 'PP';
  const subOrgCode = searchParams.get('subOrgCode') || '';
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const allOutages: Outage[] = [];
    
    if (subOrgCode === 'ALL') {
      // Return data from all regions
      const allRegions = [
        'PP0100', 'PP0300', 'PP0500', 'PP0700', 'PP0900', 'PP0800',
        'PC05AA', 'PC05CC', 'PC05DD', 'PC05FF', 'PC05GG', 'PC05HH',
        'PC05BB', 'PC05EE', 'PC05MM', 'PC05NN', 'PC05II', 'PC05PP', 'PC05KK'
      ];
      
      allRegions.forEach(regionCode => {
        // Generate mock data for each region
        for (let i = 0; i < 3; i++) {
          allOutages.push({
            subOrganizationCode: regionCode,
            subOrganizationName: getOrgName(regionCode),
            fromDate: `2025-08-${22 + i}T0${6 + i}:00:00`,
            fromDateStr: `0${6 + i}:00 ${22 + i}/08/2025`,
            toDate: `2025-08-${22 + i}T${10 + i}:00:00`,
            toDateStr: `${10 + i}:00 ${22 + i}/08/2025`,
            outageType: i % 2 === 0 ? "Kế hoạch" : "Đột xuất",
            reason: `${i % 2 === 0 ? 'Bảo trì định kỳ' : 'Sửa chữa sự cố'} khu vực ${getOrgName(regionCode)}`,
            stationCode: `${regionCode}00${i + 1}`,
            stationName: `Trạm ${getOrgName(regionCode)} ${i + 1}`,
            status: "1",
            statusStr: "Đã duyệt"
          });
        }
      });
    } else if (subOrgCode) {
      // Return data for specific region
      for (let i = 0; i < 5; i++) {
        allOutages.push({
          subOrganizationCode: subOrgCode,
          subOrganizationName: getOrgName(subOrgCode),
          fromDate: `2025-08-${22 + i}T0${6 + i}:00:00`,
          fromDateStr: `0${6 + i}:00 ${22 + i}/08/2025`,
          toDate: `2025-08-${22 + i}T${10 + i}:00:00`,
          toDateStr: `${10 + i}:00 ${22 + i}/08/2025`,
          outageType: i % 2 === 0 ? "Kế hoạch" : "Đột xuất",
          reason: `${i % 2 === 0 ? 'Bảo trì định kỳ' : 'Sửa chữa sự cố'} ${getOrgName(subOrgCode)}`,
          stationCode: `${subOrgCode}00${i + 1}`,
          stationName: `Trạm ${getOrgName(subOrgCode)} ${i + 1}`,
          status: i % 3 === 0 ? "0" : "1",
          statusStr: i % 3 === 0 ? "Chờ duyệt" : "Đã duyệt"
        });
      }
    } else {
      return NextResponse.json({ error: 'subOrgCode is required' }, { status: 400 });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOutages = allOutages.slice(startIndex, endIndex);

    const result = {
      totalCount: allOutages.length,
      items: paginatedOutages
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('Outages API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch outages' }, { status: 500 });
  }
}

function getOrgName(code: string): string {
  const orgMap: Record<string, string> = {
    'PP0100': 'Đội quản lý điện Hải Châu',
    'PP0300': 'Đội quản lý điện Liên Chiểu',
    'PP0500': 'Đội quản lý điện Sơn Trà',
    'PP0700': 'Đội quản lý điện Cẩm Lệ',
    'PP0900': 'Đội quản lý điện Thanh Khê',
    'PP0800': 'Đội quản lý điện Hòa Vang',
    'PC05AA': 'Đội quản lý điện Tam Kỳ',
    'PC05CC': 'Đội quản lý điện Hội An',
    'PC05DD': 'Đội quản lý điện Duy Xuyên',
    'PC05FF': 'Đội quản lý điện Thăng Bình',
    'PC05GG': 'Đội quản lý điện Đại Lộc',
    'PC05HH': 'Đội quản lý điện Hiệp Đức',
    'PC05BB': 'Đội quản lý điện Núi Thành',
    'PC05EE': 'Đội quản lý điện Tiên Phước',
    'PC05MM': 'Đội quản lý điện Quế Sơn',
    'PC05NN': 'Đội quản lý điện Trà My',
    'PC05II': 'Đội quản lý điện Điện Bàn',
    'PC05PP': 'Đội quản lý điện Nam Giang',
    'PC05KK': 'Đội quản lý điện Đông Giang',
  };
  return orgMap[code] || 'Đội quản lý điện';
}