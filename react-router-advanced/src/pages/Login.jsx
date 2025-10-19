export default function Login({ onLogin }) {
  return (
    <div>
      <h2>Login</h2>
      <p>Click to simulate authentication.</p>
      <button onClick={onLogin}>Log in</button>
    </div>
  );
}