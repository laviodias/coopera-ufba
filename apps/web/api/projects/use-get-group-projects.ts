import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Project } from '@/types/Project';

async function getGroupProjects(groupId: string): Promise<Project[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Project[]>(`/project/group/${groupId}`);

  return data;
}

export default function useGetGroupProjects(groupId: string) {
  return useQuery({
    queryKey: ['group-projects', groupId],
    queryFn: () => getGroupProjects(groupId),
  });
}
