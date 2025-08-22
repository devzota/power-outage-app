'use client';

import { useSearchParams } from 'next/navigation';
import { useOrganizations, useOutages } from '@/hooks/usePowerOutage';
import { useState, useEffect, Suspense } from 'react';
import OutageFilter from '@/components/OutageFilter';
import OutageList from '@/components/OutageList';

function EmbedContent() {
    const searchParams = useSearchParams();
    const theme = searchParams.get('theme') || 'light';
    const defaultRegion = searchParams.get('region');

    const { data: organizations } = useOrganizations();
    const [filters, setFilters] = useState<{
        subOrgCode: string;
        fromDate: string;
        toDate: string;
        page: number;
        limit: number;
    } | null>(null);

    const { data: outageData, isLoading } = useOutages(filters || {});

    // Auto-load ALL data when component mounts
    useEffect(() => {
        if (organizations) {
            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);

            // If no specific region, load data from first organization
            // But we'll modify API to return ALL data when subOrgCode = 'ALL'
            setFilters({
                subOrgCode: defaultRegion && defaultRegion !== 'all' ? defaultRegion : 'ALL',
                fromDate: today.toISOString().split('T')[0] + ' 00:00:00',
                toDate: nextWeek.toISOString().split('T')[0] + ' 23:59:59',
                page: 1,
                limit: 10
            });
        }
    }, [organizations, defaultRegion]);

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

    const themeClasses = theme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900';

    return (
        <div className={`min-h-screen ${themeClasses} p-4`}>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Thông tin cúp điện
                </h1>

                {organizations && (
                    <OutageFilter
                        organizations={organizations}
                        onFilterChange={handleFilterChange}
                    />
                )}

                {filters && (
                    <OutageList
                        outages={outageData?.items || []}
                        totalCount={outageData?.totalCount || 0}
                        currentPage={filters.page}
                        pageSize={filters.limit}
                        onPageChange={handlePageChange}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}

export default function EmbedPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-gray-600">Đang tải...</div>
                </div>
            </div>
        }>
            <EmbedContent />
        </Suspense>
    );
}