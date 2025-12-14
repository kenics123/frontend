const BASE_URL = "https://backend-1-mwne.onrender.com";
// const BASE_URL = "http://localhost:3001";

export const globalFetcher = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...options.header,
  };
  if (!isFormData) {
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
