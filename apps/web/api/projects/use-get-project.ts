import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Project } from '@/types/Project';

async function getProject(id: string): Promise<Project> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Project>(`/project/${id}`);

  return data;
}

export default function useGetProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
}
