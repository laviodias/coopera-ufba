import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demand } from '@/types/Demand';


async function editDemand(_data: Demand, id: string) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

    const { data } = await api(apiURL, true).patch(
        `/demand/${id}`,
        JSON.stringify(_data),
        { headers: { 'content-type': 'application/json' } },
    )

    return data
}

export default function useEditDemand(onSuccess: () => void, onError: () => void, id: string) {
    return useMutation({
        mutationFn: (data: Demand) => editDemand(data, id),
        onSuccess,
        onError
    })
}
