'use client';

import { useState } from 'react';
import { useOrganizations, useOutages } from '@/hooks/usePowerOutage';
import OutageFilter from '@/components/OutageFilter';
import OutageList from '@/components/OutageList';

export default function Home() {
  const { data: organizations, isLoading: orgLoading, error: orgError } = useOrganizations();

  const [filters, setFilters] = useState<{
    subOrgCode: string;
    fromDate: string;
    toDate: string;
    page: number;
    limit: number;
  } | null>(null);

  const {
    data: outageData,
    isLoading: outageLoading,
    error: outageError
  } = useOutages(filters || {});

  const handleFilterChange = (newFilters: {
    subOrgCode: string;
    fromDate: string;
    toDate: string;
  }) => {
    setFilters({
      ...newFilters,
      page: 1,
      limit: 10
    });
  };

  const handlePageChange = (page: number) => {
    if (filters) {
      setFilters({
        ...filters,
        page
      });
    }
  };

  if (orgLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse mx-auto">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div className="text-lg font-medium text-gray-600">Đang tải danh sách khu vực...</div>
        </div>
      </div>
    );
  }

  if (orgError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-red-600 font-medium">Lỗi tải dữ liệu: {orgError.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 max-w-7xl">

        <header className="mb-8">
          <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-lg">
            {/* Left - Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Thông tin cúp điện
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Đà Nẵng - Quảng Nam
              </p>
            </div>

            {/* Right - Quick stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Online</span>
              </div>
              <div className="text-gray-500">
                20 khu vực
              </div>
            </div>
          </div>
        </header>


        {organizations && (
          <OutageFilter
            organizations={organizations}
            onFilterChange={handleFilterChange}
          />
        )}

        {outageError && (
          <div className="glass-card rounded-2xl p-6 mb-8 bg-red-50/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="text-red-700 font-medium">
                Lỗi tải thông tin cúp điện: {outageError.message}
              </div>
            </div>
          </div>
        )}

        {filters && (
          <OutageList
            outages={outageData?.items || []}
            totalCount={outageData?.totalCount || 0}
            currentPage={filters.page}
            pageSize={filters.limit}
            onPageChange={handlePageChange}
            isLoading={outageLoading}
          />
        )}

        {!filters && (
          <div className="glass-card rounded-2xl p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-xl font-medium text-gray-500 mb-2">
              Vui lòng chọn khu vực để bắt đầu
            </div>
            <div className="text-gray-400">
              Chọn khu vực và thời gian để xem thông tin cúp điện chi tiết
            </div>
          </div>
        )}
      </div>
    </div>
  );
}