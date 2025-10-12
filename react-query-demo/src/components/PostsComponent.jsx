import { useState } from "react";
import { useQuery } from "react-query";

const PAGE_SIZE = 10;

// Fetch posts from JSONPlaceholder
async function fetchPosts(page = 1) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function PostsComponent() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(["posts", page], () => fetchPosts(page), {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true, 
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isFetching}
        >
          Next
        </button>
        {isFetching && <small> Fetching…</small>}
      </div>

      <ul style={{ marginTop: 12 }}>
        {data?.map((p) => (
          <li key={p.id}>
            <strong>{p.id}.</strong> {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}