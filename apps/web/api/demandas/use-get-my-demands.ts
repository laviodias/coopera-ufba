import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';

async function getMyDemands(): Promise<Demand[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand[]>(`/demand/my`);

  return data;
}

export default function useGetMyDemands() {
  return useQuery({
    queryKey: ['demands'],
    queryFn: getMyDemands,
  });
}
