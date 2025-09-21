import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: (() => {
    const t = import.meta.env.VITE_APP_GITHUB_API_KEY;
    return t ? { Authorization: `token ${t}` } : {};
  })(),
});

export async function fetchUserData(username) {
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
  return data;
}


export async function searchUsersAdvanced({ q, page = 1, perPage = 10 }) {
  const { data } = await api.get("/search/users", {
    params: { q, page, per_page: perPage },
  });
  
  return data;
}