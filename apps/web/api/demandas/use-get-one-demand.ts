import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';

async function getOneDemand(id: string): Promise<Demand> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Demand>(`/demand/${id}`);

  return data;
}

export default function useGetOneDemand(
  onSuccess: (data: Demand) => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (id: string) => getOneDemand(id),
    onSuccess,
    onError,
  });
}
