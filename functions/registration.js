import useSWRMutation from "swr/mutation";

export const useRegister = () => {
  return useSWRMutation("/registration", async (url, { arg }) => {
    return fetcher(url, {
      method: "POST",
      body: arg,
      headers: {},
    });
  });
};
