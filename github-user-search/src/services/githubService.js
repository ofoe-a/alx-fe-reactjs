import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: (() => {
    const token = import.meta.env.VITE_APP_GITHUB_API_KEY; 
    return token ? { Authorization: `token ${token}` } : {};
  })(),
});


export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");
  try {
    const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
    return data;
  } catch (err) {
   
    if (err?.response?.status === 404) {
      const notFound = new Error("NOT_FOUND");
      notFound.code = 404;
      throw notFound;
    }
    if (err?.response?.status === 403) {
      const rate = new Error("RATE_LIMIT");
      rate.code = 403;
      throw rate;
    }
    throw err;
  }
}