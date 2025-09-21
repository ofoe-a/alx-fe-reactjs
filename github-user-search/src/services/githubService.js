import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");
  const { data } = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  return data;
}


export async function searchUsersAdvanced({
  username = "",
  location = "",
  minRepos = 0,
  page = 1,
  perPage = 10,
}) {
  const parts = [];
  if (username) parts.push(`${username} in:login`);
  if (location) parts.push(`location:${location}`);     
  if (minRepos) parts.push(`repos:>=${minRepos}`);     

  const q = parts.join(" ").trim() || "type:user";

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`;

  const { data } = await axios.get(url, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });

 
  return data;
}