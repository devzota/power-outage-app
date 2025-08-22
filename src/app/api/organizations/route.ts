import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Sử dụng proxy hoặc fallback data
    const response = await fetch('https://cskh-api.cpc.vn/api/remote/organizations?maDonViCapTren=PP', {
      headers: {
        'Origin': 'https://cskh.cpc.vn',
        'Referer': 'https://cskh.cpc.vn/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
      },
      timeout: 15000, // Tăng timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Organizations API Error:', error);
    
    // Fallback data khi API không accessible
    const fallbackData = [
      { id: "e97adab0-e4cf-458c-b410-a9dee018f4e3", organizationName: "Đội quản lý điện Hải Châu", code: "PP0100" },
      { id: "b75a27b2-88bf-470d-ac0d-432c6506641f", organizationName: "Đội quản lý điện Liên Chiểu", code: "PP0300" },
      { id: "4905b2ea-1a1d-4c57-83e6-b955bfb822db", organizationName: "Đội quản lý điện Sơn Trà", code: "PP0500" },
      { id: "89dc090c-0b9d-4c31-90db-b09e6656c7ea", organizationName: "Đội quản lý điện Cẩm Lệ", code: "PP0700" },
      { id: "911b46d3-41dc-4fa1-b6f5-a11e4b8daa8c", organizationName: "Đội quản lý điện Thanh Khê", code: "PP0900" },
      { id: "6a23be6d-76a4-4cb5-8a8b-091b65fde4a4", organizationName: "Đội quản lý điện Hòa Vang", code: "PP0800" },
      { id: "978612e4-6931-45ac-9a8d-5474d5560491", organizationName: "Đội quản lý điện Tam Kỳ", code: "PC05AA" },
      { id: "0a7170a2-ac1b-4b05-a8b9-7b1de9324cce", organizationName: "Đội quản lý điện Hội An", code: "PC05CC" },
      { id: "26d03001-3e92-4217-8d42-18e8ac6fd438", organizationName: "Đội quản lý điện Duy Xuyên", code: "PC05DD" },
      { id: "5e06092c-c820-4e95-853f-e6deaba9edd7", organizationName: "Đội quản lý điện Thăng Bình", code: "PC05FF" },
      { id: "cb4248ef-ea88-40ae-83a7-c60b7e7a80b3", organizationName: "Đội quản lý điện Hiệp Đức", code: "PC05HH" },
      { id: "ebe5104b-9360-4cf9-8ec8-c53819f24299", organizationName: "Đội quản lý điện Núi Thành", code: "PC05BB" },
      { id: "f770b444-5137-4695-a12f-645950b6ff9b", organizationName: "Đội quản lý điện Tiên Phước", code: "PC05EE" },
      { id: "5b0533fd-c8cd-4d8c-906d-5fb95c15d10f", organizationName: "Đội quản lý điện Quế Sơn", code: "PC05MM" },
      { id: "69f3035e-a628-4699-b49f-85077750d7a1", organizationName: "Đội quản lý điện Trà My", code: "PC05NN" },
      { id: "43ea2c64-3de4-4749-ba2f-644a9528c462", organizationName: "Đội quản lý điện Điện Bàn", code: "PC05II" },
      { id: "b918492a-7bee-428b-804e-1c9bd6a27c28", organizationName: "Đội quản lý điện Nam Giang", code: "PC05PP" },
      { id: "58850879-5b14-432e-986f-ca46cbc2998e", organizationName: "Đội quản lý điện Đông Giang", code: "PC05KK" },
      { id: "19a524ed-7967-40af-ae48-d984205d35fa", organizationName: "Đội quản lý điện Đại Lộc", code: "PC05GG" },
      { id: "e852c9c5-21e1-4a1e-bfab-6c2d320375e4", organizationName: "Xí nghiệp Lưới điện cao thế Đà Nẵng", code: "PP00ZZ" }
    ];
    
    return NextResponse.json(fallbackData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600',
      },
    });
  }
}