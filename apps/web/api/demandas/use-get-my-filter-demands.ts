import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';
import { useMutation } from '@tanstack/react-query';

async function getMyFilterDemands(query: string): Promise<Demand[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand[]>(
    `/demand/suggest-filter?query=${query}`,
  );

  return data;
}

export default function useGetMyFilterDemands(
  onSuccess: (data: Demand[]) => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (query: string) => getMyFilterDemands(query),
    onSuccess,
    onError,
  });
}
