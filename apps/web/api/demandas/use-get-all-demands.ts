import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';

async function getAllDemands(): Promise<Demand[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, false).get<Demand[]>(`/demand/all`);

  return data;
}

export default function useGetAllDemands() {
  return useQuery({
    queryKey: ['all-demands'],
    queryFn: getAllDemands,
  });
}
