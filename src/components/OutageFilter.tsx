'use client';

import { useState } from 'react';
import { Organization } from '@/types/power-outage';
import { format } from 'date-fns';

interface OutageFilterProps {
    organizations: Organization[];
    onFilterChange: (filters: {
        subOrgCode: string;
        fromDate: string;
        toDate: string;
    }) => void;
}

export default function OutageFilter({ organizations, onFilterChange }: OutageFilterProps) {
    const [selectedOrg, setSelectedOrg] = useState('');
    const [fromDate, setFromDate] = useState(() => {
        const today = new Date();
        return format(today, 'yyyy-MM-dd');
    });
    const [toDate, setToDate] = useState(() => {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        return format(nextWeek, 'yyyy-MM-dd');
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedOrg && fromDate && toDate) {
            onFilterChange({
                subOrgCode: selectedOrg,
                fromDate: `${fromDate} 00:00:00`,
                toDate: `${toDate} 23:59:59`,
            });
        }
    };

    return (
        <div className="glass-card rounded-xl p-6 mb-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Header compact */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Tìm kiếm</h2>
                </div>

                {/* Form layout: 1 row on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                    {/* Select khu vực */}
                    <div className="lg:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Khu vực
                        </label>
                        <div className="relative">
                            <select
                                value={selectedOrg}
                                onChange={(e) => setSelectedOrg(e.target.value)}
                                className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 appearance-none cursor-pointer text-sm"
                                required
                            >
                                <option value="">-- Chọn khu vực --</option>
                                <option value="ALL">🔍 Tất cả khu vực</option>
                                {organizations.map((org) => (
                                    <option key={org.id} value={org.code}>
                                        {org.organizationName}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Từ ngày */}
                    <div className="lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Từ ngày
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 text-sm"
                            required
                        />
                    </div>

                    {/* Đến ngày */}
                    <div className="lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đến ngày
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 text-sm"
                            required
                        />
                    </div>

                    {/* Button */}
                    <div className="lg:col-span-1">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm"
                        >
                            <div className="flex items-center justify-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="hidden sm:inline">Tìm</span>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}