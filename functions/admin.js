import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { authFetcher, globalFetcher } from "./fetcher";

const TOKEN_KEY = "kenics_admin_token";
const ADMIN_KEY = "kenics_admin";

export function saveAdminSession(accessToken, admin) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY) || "null");
  } catch {
    return null;
  }
}

export function useAdminLogin() {
  return useSWRMutation("/admin/login", async (url, { arg }) => {
    return globalFetcher(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  });
}

export function useAdminMe(enabled = true) {
  return useSWR(enabled ? "/admin/me" : null, authFetcher);
}

export function useContests(enabled = true) {
  return useSWR(enabled ? "/contest" : null, authFetcher);
}

export function useContestDetail(id) {
  return useSWR(id ? `/contest/${id}` : null, authFetcher);
}

export function useCreateContest() {
  return useSWRMutation("/contest", async (url, { arg }) => {
    return authFetcher(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });
  });
}

export async function updateContest(id, payload) {
  return authFetcher(`/contest/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function useAddCategory(contestId) {
  return useSWRMutation(
    contestId ? `/contest/${contestId}/categories` : null,
    async (url, { arg }) => {
      return authFetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
  );
}

export async function updateCategory(contestId, categoryId, payload) {
  return authFetcher(`/contest/${contestId}/categories/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function activateContest(id) {
  return authFetcher(`/contest/${id}/activate`, { method: "PATCH" });
}

export async function deactivateContest(id) {
  return authFetcher(`/contest/${id}/deactivate`, { method: "PATCH" });
}

export async function startContestVoting(id) {
  return authFetcher(`/contest/${id}/start-voting`, { method: "PATCH" });
}

export async function stopContestVoting(id) {
  return authFetcher(`/contest/${id}/stop-voting`, { method: "PATCH" });
}

export function useContactMessages(enabled = true) {
  return useSWR(enabled ? "/contact" : null, authFetcher);
}

export async function markContactRead(id) {
  return authFetcher(`/contact/${id}/read`, { method: "PATCH" });
}

export function useAdminRegistrations(contestId) {
  const query = contestId
    ? `/registration/admin/list?contestId=${encodeURIComponent(contestId)}`
    : "/registration/admin/list";
  return useSWR(query, authFetcher);
}

export function useAdminStats(enabled = true) {
  return useSWR(enabled ? "/admin/stats" : null, authFetcher);
}

export function useAdminRegistration(id) {
  return useSWR(
    id ? `/registration/admin/${id}` : null,
    authFetcher,
  );
}

export function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function formatShowDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
