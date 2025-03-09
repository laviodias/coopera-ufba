import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';
import { useMutation } from '@tanstack/react-query';

async function getFilterDemands({query, keywords, date}: {query: string, keywords: string, date: string}): Promise<Demand[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, false).get<Demand[]>(
    `/demand/suggest?query=${query}&keywords=${keywords}&date=${date}`,
  );

  return data;
}

export default function useGetFilterDemands(
  onSuccess: (data: Demand[]) => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (filters: {query: string, keywords: string, date: string}) => getFilterDemands(filters),
    onSuccess,
    onError,
  });
}
