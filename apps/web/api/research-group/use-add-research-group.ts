import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { ResearchGroup } from '@/types/ResearchGroup';

async function addResearchGroup(_data: ResearchGroup) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).post(
    `/researchgroup`,
    JSON.stringify(_data),
    { headers: { 'content-type': 'application/json' } },
  );
  return data;
}

export default function useAddResearchGroup(
  onSuccess: () => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (data: ResearchGroup) => addResearchGroup(data),
    onSuccess,
    onError,
  });
}
