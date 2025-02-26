import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Researcher } from '@/types/Researcher';

async function getReseachGroupMembers(groupId: string): Promise<Researcher[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Researcher[]>(
    `/researchgroup/${groupId}/members`,
  );

  return data;
}

export default function useGetResearchGroupMembers(groupId: string) {
  return useQuery({
    queryKey: ['researchgroups-members', groupId],
    queryFn: () => getReseachGroupMembers(groupId),
  });
}
