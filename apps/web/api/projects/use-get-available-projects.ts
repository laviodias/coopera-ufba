import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Project } from '@/types/Project';


async function getAvailableProjects(): Promise<Project[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<Project[]>("/project/available")

  return data
}

export default function useGetAvailableProjects() {
  return useQuery({
    queryKey: ['available-projects'],
    queryFn: getAvailableProjects,
  })
}