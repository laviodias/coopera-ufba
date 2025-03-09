import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Project } from '@/types/Project';

async function updateProject(id: string, _data: Partial<Project>) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).put(
    `/project/${id}`,
    JSON.stringify(_data),
    { headers: { 'content-type': 'application/json' } },
  );

  return data;
}

export default function useUpdateProject(
  id: string,
  onSuccess: () => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (data: Partial<Project>) => updateProject(id, data),
    onSuccess,
    onError,
  });
}
