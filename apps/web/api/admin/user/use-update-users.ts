import { api } from '@/lib/axios';
import { User } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

async function adminUpdateUserMethod(userId: string, _data: User) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).patch(
    `/admin/users/${userId}`,
    JSON.stringify(_data),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  return data;
}

export default function useAdminUpdateUser(
  userId: string,
  onSuccess: () => void,
  onError: () => void,
) {
  return useMutation({
    mutationFn: (data: User) => adminUpdateUserMethod(userId, data),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      onError();
    },
  });
}
