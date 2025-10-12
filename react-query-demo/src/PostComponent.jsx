// src/components/PostsComponent.jsx
import { useQuery } from "react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery(["posts"], fetchPosts, {
    // cache & responsiveness
    staleTime: 1000 * 60,   // 1 minute: stays “fresh” → no refetch on remount
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => refetch()}>Refetch</button>
        {isFetching && <small>Fetching…</small>}
        <small>Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}</small>
      </div>

      <ul style={{ marginTop: 12 }}>
        {data.slice(0, 10).map((p) => (
          <li key={p.id}>
            <strong>{p.id}.</strong> {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}