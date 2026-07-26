const BASE_URL = "https://backend-1-mwne.onrender.com";
// const BASE_URL = "http://localhost:8080";

export const globalFetcher = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(options.headers || {}),
  };
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw {
      status: data.statusCode,
      message: data.message || "Request failed",
      error: data.error,
    };
  }

  return data;
};

export const authFetcher = async (path, options = {}) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("kenics_admin_token")
      : null;

  return globalFetcher(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
