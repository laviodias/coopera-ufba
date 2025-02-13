import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Project } from "@/types/Project";

async function addProject(_data: Partial<Project>) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).post(
    `/project`,
    JSON.stringify(_data),
    { headers: { "content-type": "application/json" } }
  );

  return data;
}

export default function useAddProject(
  onSuccess: () => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (data: Partial<Project>) => addProject(data),
    onSuccess,
    onError,
  });
}
