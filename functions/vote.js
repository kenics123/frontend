import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { globalFetcher } from "./fetcher";

export function useInitiateVote() {
  return useSWRMutation("/vote", async (url, { arg }) => {
    return globalFetcher(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  });
}

export function useWinners() {
  return useSWR("/vote/winners", globalFetcher);
}
