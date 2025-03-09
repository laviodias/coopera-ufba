import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function getCompanies(): Promise<Record<string, string>[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

  const { data } = await api(apiURL, false).get('/company/names');

  return data;
}

export default function useGetCompanies() {
  return useQuery({
    queryKey: ['company'],
    queryFn: () => getCompanies(),
  });
}

