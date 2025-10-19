import { Link, Routes, Route, Outlet } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails";
import ProfileSettings from "../pages/ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h2>Profile (components/Profile.jsx)</h2>

      <nav style={{ display: "flex", gap: 10 }}>
        <Link to="">ProfileDetails</Link>
        <Link to="settings">ProfileSettings</Link>
      </nav>

     
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

     
      <Outlet />
    </div>
  );
}