import useSWR from "swr";
import { globalFetcher } from "./fetcher";

export function useActiveContest() {
  return useSWR("/contest/active", globalFetcher);
}

export function formatNaira(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}
