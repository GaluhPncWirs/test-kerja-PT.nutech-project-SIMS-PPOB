const API_URL = "https://take-home-test-api.nutech-integrasi.com";

export async function fetchApi(url: string, options = {}) {
  return fetch(`${API_URL}${url}`, {
    ...options,
    // credentials: "include",
  });
}
