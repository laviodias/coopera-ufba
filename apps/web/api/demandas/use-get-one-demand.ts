import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';

async function getOneDemand(id: string): Promise<Demand> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand>(`/demand/${id}`);

  return data;
}

export default function useGetOneDemand(id: string) {
  return useQuery({
    queryKey: ['get-one-demand'],
    queryFn: () => getOneDemand(id),
  });
}
