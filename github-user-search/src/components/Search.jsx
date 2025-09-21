import { useState } from "react";
import { searchUsersAdvanced } from "../services/githubService.js";
import { buildQuery } from "../services/query.js";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle"); // idle|loading|error|done
  const perPage = 10;

  const runSearch = async (resetPage = true) => {
    const nextPage = resetPage ? 1 : page + 1;
    const q = buildQuery({
      username: username.trim(),
      location: location.trim(),
      minRepos: minRepos ? Number(minRepos) : undefined,
    });

    setStatus("loading");
    try {
      const data = await searchUsersAdvanced({ q, page: nextPage, perPage });
      setTotal(data.total_count);
      setResults(resetPage ? data.items : [...results, ...data.items]);
      setPage(nextPage);
      setStatus("done");
    } catch (e) {
      setStatus("error");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runSearch(true);
  };

  return (
    <section className="container" style={{ maxWidth: 840, margin: "2rem auto", padding: "1rem" }}>
      <form onSubmit={onSubmit} className="grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12 }}>
        <input placeholder="Username (login)" value={username}
               onChange={e => setUsername(e.target.value)} />
        <input placeholder="Location (e.g. Accra)" value={location}
               onChange={e => setLocation(e.target.value)} />
        <input placeholder="Min repos" type="number" min="0" value={minRepos}
               onChange={e => setMinRepos(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p style={{ marginTop: 12 }}>Loading...</p>}
      {status === "error" && <p role="alert" style={{ marginTop: 12 }}>
        Something went wrong (maybe rate limit — add a token in .env).
      </p>}

      {results.length > 0 && (
        <>
          <p style={{ margin: "12px 0" }}>
            Showing {results.length} of {total.toLocaleString()} users
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {results.map(u => (
              <li key={u.id} style={{
                display: "grid", gridTemplateColumns: "56px 1fr auto",
                gap: 12, alignItems: "center", border: "1px solid #e5e7eb",
                borderRadius: 10, padding: 10, marginBottom: 10
              }}>
                <img src={u.avatar_url} alt={u.login} width={56} height={56} style={{ borderRadius: "50%" }} />
                <div>
                  <strong>{u.login}</strong><br/>
                  <a href={u.html_url} target="_blank" rel="noreferrer">View profile ↗</a>
                </div>
                <span>ID: {u.id}</span>
              </li>
            ))}
          </ul>

          {results.length < total && status !== "loading" && (
            <button onClick={() => runSearch(false)} style={{ marginTop: 12 }}>
              Load more
            </button>
          )}
        </>
      )}

      {status === "done" && results.length === 0 && (
        <p style={{ marginTop: 12 }}>No users matched your filters.</p>
      )}
    </section>
  );
}