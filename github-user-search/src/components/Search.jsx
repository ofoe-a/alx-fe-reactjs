// src/components/Search.jsx
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
    <section style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit" style={{ marginLeft: "8px", padding: "0.5rem 1rem" }}>
          Search
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}

      {status === "done" && user && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <h2>{user.name ?? user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </section>
  );
}