import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ display: "flex", gap: 10 }}>
        <Link to="">ProfileDetails</Link>
        <Link to="settings">ProfileSettings</Link>
      </nav>
      <div style={{ marginTop: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}