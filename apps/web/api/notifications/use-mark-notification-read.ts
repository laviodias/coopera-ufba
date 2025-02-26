import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function markNotificationRead(id: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).post(
    '/notifications/read',
    { id },
    { headers: { 'content-type': 'application/json' } },
  );

  return data;
}

export default function useMarkNotificationRead() {
  return useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
  });
}
