import { useState } from "react";
import { fetchUserData } from "../services/githubService.js";  

export default function Search() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus("loading");
    setError("");
    setUser(null);

    try {
     
      const data = await fetchUserData(query.trim());
      setUser(data);
      setStatus("done");
    } catch (err) {
      setError("Looks like we cant find the user");
      setStatus("error");
    }
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}

      {status === "done" && user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <h2>{user.name ?? user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </section>
  );
}