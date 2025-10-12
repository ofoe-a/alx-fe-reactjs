import { useState } from "react";

export default function RegistrationForm() {
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = (v = values) => {
    const e = {};
    if (!v.username.trim()) e.username = "Username is required";
    if (!v.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email";
    if (!v.password) e.password = "Password is required";
    else if (v.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors(validate(next)); // live validation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eNow = validate();
    setErrors(eNow);
    if (Object.keys(eNow).length === 0) {
      // pretend to register
      alert(`Registered: ${values.username} / ${values.email}`);
      setValues({ username: "", email: "", password: "" });
    }
  };

  const isInvalid = Object.keys(errors).length > 0 || !values.username || !values.email || !values.password;

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Register (Controlled Components)</h2>

      <label>
        Username
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="e.g. ofoe_mahogana"
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}
      </label>

      <labe>
        Email
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </labe
      <label>
        Password
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="min 6 chars"
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}
      </label>

      <button disabled={isInvalid}>Create account</button>
    </form>
  );
}

const styles = {
  form: { display: "grid", gap: 12, maxWidth: 420, margin: "32px auto" },
  error: { color: "crimson", fontSize: 12 }
};