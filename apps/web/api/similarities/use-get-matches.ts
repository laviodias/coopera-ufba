import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { SimilarityMatch, SimilarityMatchType } from '@/types/SimilarityMatch';

async function getMatches(
  id: string,
  type: SimilarityMatchType,
): Promise<SimilarityMatch[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).get<SimilarityMatch[]>(
    `/similarity/matches/${id}/${type}`,
  );

  return data;
}

export default function useGetMatches(id: string, type: SimilarityMatchType) {
  return useQuery({
    queryKey: ['matches', id, type],
    queryFn: () => getMatches(id, type),
  });
}
