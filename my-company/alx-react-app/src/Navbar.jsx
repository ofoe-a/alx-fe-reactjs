// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";

const bar = {
  display: "flex",
  gap: 16,
  alignItems: "center",
  padding: "12px 20px",
  borderBottom: "1px solid #eee",
};

const link = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: 600,
  padding: "6px 10px",
  borderRadius: 8,
  background: isActive ? "#f2f2f2" : "transparent",
  color: "#222",
});

export default function Navbar() {
  return (
    <nav style={bar}>
      <span style={{ fontWeight: 800 }}>my-company</span>
      <NavLink to="/" style={link} end>Home</NavLink>
      <NavLink to="/about" style={link}>About</NavLink>
      <NavLink to="/services" style={link}>Services</NavLink>
      <NavLink to="/contact" style={link}>Contact</NavLink>
    </nav>
  );
}