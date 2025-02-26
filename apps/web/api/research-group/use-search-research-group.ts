import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ResearchGroup } from '@/types/ResearchGroup';

async function searchResearchGroup(query: string): Promise<ResearchGroup[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, false).post<ResearchGroup[]>(
    `/researchgroup/search?data=${query}`,
  );

  return data;
}

export default function useSearchResearchGroup(query: string) {
  return useQuery({
    queryKey: ['search-research-group', query],
    queryFn: () => searchResearchGroup(query),
  });
}
