import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();
  return (
    <div>
      <h2>Post</h2>
      <p>Showing post with id: <strong>{postId}</strong></p>
    </div>
  );
}