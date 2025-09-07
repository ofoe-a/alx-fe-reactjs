import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",  
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#f4f4f4",       
    borderBottom: "1px solid #ccc",
  };

  const linkStyle = {
    margin: "0 10px",
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: "bold" }}>My Company</div>
      <div>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/services" style={linkStyle}>Services</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
      </div>
    </nav>
  );
}