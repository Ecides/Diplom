// Imports
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase.js";

import "../styles/authStyles.css";
import eyeopen from "../assets/eyeopen.svg";
import eyeclose from "../assets/eyeclose.svg";

// Component
function AuthModule({ user, closeMenu }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");
      console.log("Begin registration...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const currentUser = userCredential.user;

      await updateProfile(currentUser, { displayName: name });

      await setDoc(doc(db, "users", currentUser.uid), {
        name: name,
        email: currentUser.email,
        favorites: [],
        role: "user",
        createdAt: new Date().toISOString(),
      });

      console.log("Success! User registered and added to the database.");
      closeMenu();
    } catch (err) {
      console.error("Firebase error:", err);
      setError("Registration error: " + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      console.log("Trying to log in as:", email);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("Success! Welcome back,", userCredential.user.email);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");

      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: currentUser.email,
          name: currentUser.displayName,
          favorites: [],
          role: "user",
          createdAt: new Date().toISOString(),
        });
      }

      console.log("Success! Logged in with Google:", currentUser.displayName);
    } catch (err) {
      console.error(err);
      setError("Google authentication error: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Success! Logged out.");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="dropdown" onClick={(e) => e.stopPropagation()}>
      {user ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="profile">
            Profile
            <div className="flex-profile">
              <p>Email: </p>
              <p>{user.email}</p>
              <p>Name: </p>
              <p>{user.displayName}</p>
            </div>
          </div>
          <div className="logout-btn" onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleLogin}>
          {error && (
            <p style={{ color: "#ff4d4d", fontSize: "12px", margin: 0 }}>
              {error}
            </p>
          )}

          <input
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={10}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img style={{width: "24px", height: "24px"}} src={eyeclose} alt="Hide password" /> : <img style={{width: "24px", height: "24px"}} src={eyeopen} alt="Show password" />}
            </button>
          </div>

          <button type="submit">Sign In</button>

          <button type="button" onClick={handleRegister}>
            Register
          </button>

          <hr />

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </button>
        </form>
      )}
    </div>
  );
}

export default AuthModule;
