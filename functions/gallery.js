import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { authFetcher, globalFetcher } from "./fetcher";

export function useGallery() {
  return useSWR("/gallery", globalFetcher);
}

export function useUploadGallery() {
  return useSWRMutation("/gallery", async (url, { arg }) => {
    return authFetcher(url, {
      method: "POST",
      body: arg,
    });
  });
}

export async function deleteGalleryPhoto(id) {
  return authFetcher(`/gallery/${id}`, { method: "DELETE" });
}
