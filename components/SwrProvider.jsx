"use client";

import { SWRConfig } from "swr";
import { globalFetcher } from "../functions/fetcher";

export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: globalFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
