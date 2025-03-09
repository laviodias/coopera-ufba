import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { KnowledgeArea } from '@/types/KnowledgeArea';

async function getAllKnowledgeAreas(): Promise<KnowledgeArea[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';
  
  const { data } = await api(apiURL, false).get<KnowledgeArea[]>(
    `/researchgroup/knowledgearea/all`,
  );

  return data;
}

export default function useGetAllKnowledgeAreas() {
  return useQuery({
    queryKey: ['all-knowledge-areas'],
    queryFn: getAllKnowledgeAreas,
  });
}
