'use client';

import { Outage } from '@/types/power-outage';
import Pagination from './Pagination';

interface OutageListProps {
    outages: Outage[];
    isLoading: boolean;
    totalCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function OutageList({
    outages,
    isLoading,
    totalCount,
    currentPage,
    pageSize,
    onPageChange
}: OutageListProps) {
    if (isLoading) {
        return (
            <div className="glass-card rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-center py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-600">Đang tải thông tin cúp điện...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (outages.length === 0) {
        return (
            <div className="glass-card rounded-xl p-6 shadow-lg">
                <div className="text-center py-6 text-gray-500">
                    Không có thông tin cúp điện trong khoảng thời gian đã chọn
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="glass-card rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">
                            Thông tin cúp điện ({totalCount.toLocaleString()} kết quả)
                        </h3>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {outages.map((outage, index) => (
                        <div key={`${outage.stationCode}-${index}`} className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                            <div className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">
                                                {outage.stationName}
                                            </h4>

                                            {/* Station code + Time + Status in one line */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div className="text-sm text-gray-500 font-medium">
                                                    Mã trạm: {outage.stationCode}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-full">
                                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                        <span className="text-xs font-medium text-blue-700">{outage.subOrganizationName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-purple-50 px-2 py-1 rounded-full">
                                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                                        <span className="text-xs font-medium text-purple-700">{outage.outageType}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-sm text-gray-700">
                                                        <span className="font-medium">{outage.fromDateStr}</span>
                                                        <span className="text-gray-400 mx-2">→</span>
                                                        <span className="font-medium">{outage.toDateStr}</span>
                                                    </div>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${outage.statusStr === 'Đã duyệt'
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                                        : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                                                        }`}>
                                                        {outage.statusStr}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <p className="text-gray-700 text-sm">{outage.reason}</p>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={onPageChange}
                isLoading={isLoading}
            />
        </div>
    );
}