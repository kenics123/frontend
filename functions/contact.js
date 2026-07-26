import useSWRMutation from "swr/mutation";
import { globalFetcher } from "./fetcher";

export function useSubmitContact() {
  return useSWRMutation("/contact", async (url, { arg }) => {
    return globalFetcher(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  });
}
