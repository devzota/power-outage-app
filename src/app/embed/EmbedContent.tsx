'use client';

import { useSearchParams } from 'next/navigation';
import { useOrganizations, useOutages } from '@/hooks/usePowerOutage';
import { useState, useEffect } from 'react';
import OutageFilter from '@/components/OutageFilter';
import OutageList from '@/components/OutageList';

export default function EmbedContent() {
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

    // Auto-select region if provided
    useEffect(() => {
        if (defaultRegion && defaultRegion !== 'all' && organizations) {
            const org = organizations.find(o => o.code === defaultRegion);
            if (org) {
                const today = new Date();
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);

                setFilters({
                    subOrgCode: defaultRegion,
                    fromDate: today.toISOString().split('T')[0] + ' 00:00:00',
                    toDate: nextWeek.toISOString().split('T')[0] + ' 23:59:59',
                    page: 1,
                    limit: 10
                });
            }
        }
    }, [defaultRegion, organizations]);

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
            <div className="max-w-4xl mx-auto">
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

                {!filters && (
                    <div className="glass-card rounded-xl p-8 text-center shadow-lg">
                        <div className="text-gray-500">
                            Vui lòng chọn khu vực và thời gian để xem thông tin cúp điện
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}