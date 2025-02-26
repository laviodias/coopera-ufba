import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { User } from '@/types/User';

async function getAllUsers(): Promise<User[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<User[]>(`/admin/users`)

  return data
}

export default function useGetAllUsers() {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: getAllUsers,
  })
}
