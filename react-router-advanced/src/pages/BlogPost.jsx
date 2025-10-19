import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return (
    <div>
      <h2>BlogPost Page</h2>
      <p>Displaying blog post with ID: {id}</p>
    </div>
  );
}