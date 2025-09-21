export function buildQuery({ username, location, minRepos }) {
  const parts = [];
  if (username) parts.push(`${username} in:login`);
  if (location) parts.push(`location:${JSON.stringify(location)}`); 
  if (minRepos) parts.push(`repos:>=${minRepos}`);
  return parts.join(" ").trim() || "type:user"; 
}