import { useState } from "react";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (email && password) {
      setIsLoggedIn(true);
      console.log("Login Successful");
    } else {
      alert("Please enter email and password");
    }
  }

  return (
    <>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      {isLoggedIn && <h2>Welcome Back!</h2>}
    </>
  );
}

export default Login;