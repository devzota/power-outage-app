import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Organization, OutageResponse, OutageFilters } from '@/types/power-outage';

export const useOrganizations = () => {
  return useQuery<Organization[]>({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data } = await axios.get('/api/organizations');
      return data;
    },
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
  });
};

export const useOutages = (filters: Partial<OutageFilters>) => {
  return useQuery<OutageResponse>({
    queryKey: ['outages', filters],
    queryFn: async () => {
      const { data } = await axios.get('/api/outages', { params: filters });
      return data;
    },
    enabled: !!filters.subOrgCode, // Chỉ chạy khi có subOrgCode
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};