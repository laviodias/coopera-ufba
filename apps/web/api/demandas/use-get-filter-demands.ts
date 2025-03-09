import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';
import { useMutation } from '@tanstack/react-query';

async function getFilterDemands(query: string): Promise<Demand[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand[]>(
    `/demand/suggest?query=${query}`,
  );

  return data;
}

export default function useGetFilterDemands(
  onSuccess: (data: Demand[]) => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (query: string) => getFilterDemands(query),
    onSuccess,
    onError,
  });
}
