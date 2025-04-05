import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Project } from '@/types/Project';

async function getMyProjects(): Promise<Project[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<Project[]>('/project/my');

  return data;
}

export default function useGetMyProjects() {
  return useQuery({
    queryKey: ['my-projects'],
    queryFn: getMyProjects,
  });
}
