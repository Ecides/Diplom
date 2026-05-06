import { useState } from "react";
import "../styles/authStyles.css";

function AuthModule({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Trying to login with:", email, password);
  };

  return (
    <div className="dropdown" onClick={(e) => e.stopPropagation()}>
      
      {user ? (
        // Если авторизован
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>Profile</div>
          <div style={{ color: "#ff4d4d", cursor: "pointer" }}>Logout</div>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleLogin}>
          
          <input
            name="email"
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          
          <input
            name="password"
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit">Sign In</button>
          <button type="button">Register</button>
          
          <hr />
          
          <button type="button" className="google-btn"> Sign in with Google</button>
        </form>
      )}
    </div>
  );
}

export default AuthModule;