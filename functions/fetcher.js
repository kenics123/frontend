const BASE_URL = "https://backend-er1g.onrender.com";
export const globalFetcher = async (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...options.header,
  };
  if (isFormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw {
      status: res.status,
      message: error.message || "Request failed",
      data: error,
    };
  }

  return res.json();
};
