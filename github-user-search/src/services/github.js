import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: (() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    return token ? { Authorization: `token ${token}` } : {};
  })(),
});


export async function getUser(username) {
  if (!username) throw new Error("Username is required");
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
  return data;
}


export async function searchUsers(query) {
  if (!query) return { items: [] };
  const { data } = await api.get(`/search/users`, { params: { q: query } });
  return data; 
}