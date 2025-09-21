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
      if (err.message === "NOT_FOUND") setError("Looks like we cant find the user");
      else if (err.message === "RATE_LIMIT")
        setError("Rate limit exceeded. Add a token in .env.");
      else setError("Something went wrong");
      setStatus("error");
    }
  };

  return (
    <section style={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter GitHub username (e.g. torvalds)"
          aria-label="GitHub username"
          style={{ flex: 1, padding: "0.6rem" }}
        />
        <button type="submit">Search</button>
      </form>

      {/* Status messages */}
      {status === "loading" && <p style={{ marginTop: 12 }}>Loading...</p>}
      {status === "error" && <p style={{ marginTop: 12 }} role="alert">{error}</p>}

      {/* Result */}
      {status === "done" && user && (
        <article
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "96px 1fr",
            gap: 16,
            alignItems: "center",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={96}
            height={96}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{user.name ?? user.login}</h2>
            <p style={{ margin: "4px 0", opacity: 0.8 }}>@{user.login}</p>
            {user.bio && <p style={{ margin: "6px 0" }}>{user.bio}</p>}
            <p style={{ margin: "6px 0" }}>
              Repos: {user.public_repos} • Followers: {user.followers} • Following: {user.following}
            </p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View on GitHub ↗
            </a>
          </div>
        </article>
      )}
    </section>
  );
}