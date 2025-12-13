import useSWRMutation from "swr/mutation";
import { globalFetcher } from "./fetcher";

export const useRegister = () => {
  return useSWRMutation("/registration", async (url, { arg }) => {
    return globalFetcher(url, {
      method: "POST",
      body: arg,
      headers: {},
    });
  });
};
