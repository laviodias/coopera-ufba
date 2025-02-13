import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';


async function addDemand(_data: Demand) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).post(
    `/demand`,
    JSON.stringify(_data),
    { headers: { 'content-type': 'application/json' } },
  )

  return data
}

export default function useAddDemand(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (data: Demand) => addDemand( data),
    onSuccess,
    onError
  })
}
