import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Proposal } from '@/types/Proposal';

async function getMyProposals(): Promise<Proposal[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Proposal[]>('/proposal/my');

  return data;
}

export default function useGetMyProposals() {
  return useQuery({
    queryKey: ['proposal'],
    queryFn: () => getMyProposals(),
  });
}
