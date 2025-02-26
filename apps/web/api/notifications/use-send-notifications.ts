import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

type SendNotification = {
  message: string;
  userId: string;
};

async function sendNotification(_data: SendNotification) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, true).post('/notifications/send', _data, {
    headers: { 'content-type': 'application/json' },
  });

  return data;
}

export default function useSendNotification() {
  return useMutation({
    mutationFn: (data: SendNotification) => sendNotification(data),
  });
}
