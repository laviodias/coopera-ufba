import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';

async function getDemand(id: string): Promise<Demand> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand>(`/demand/${id}`);

  return data;
}

export default function useGetDemand(id: string) {
  return useQuery({
    queryKey: ['demand', id],
    queryFn: () => getDemand(id),
  });
}
