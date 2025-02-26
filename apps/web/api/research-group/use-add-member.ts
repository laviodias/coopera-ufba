import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function researchGroupAddMember(groupId: string, userEmail: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).post(
    `/researchgroup/${groupId}/members/${userEmail}`,
  );

  return data;
}

export default function useResearchGroupAddMember(
  groupId: string,
  onSuccess: () => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (userEmail: string) =>
      researchGroupAddMember(groupId, userEmail),
    onSuccess,
    onError,
  });
}
