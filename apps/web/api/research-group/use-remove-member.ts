import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function researchGroupRemoveMember(groupId: string, userId: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).delete(
    `/researchgroup/${groupId}/members/${userId}`,
  );

  return data;
}

export default function useResearchGroupRemoveMember(
  groupId: string,
  onSuccess: () => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (userId: string) => researchGroupRemoveMember(groupId, userId),
    onSuccess,
    onError,
  });
}
