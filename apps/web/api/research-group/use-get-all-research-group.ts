import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ResearchGroup } from '@/types/ResearchGroup';

async function getAllResearchGroups(): Promise<ResearchGroup[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, false).get<ResearchGroup[]>(`/researchgroup/all`)

  return data
}

export default function useGetAllResearchGroups() {
  return useQuery({
    queryKey: ['all-research-groups'],
    queryFn: getAllResearchGroups,
  })
}