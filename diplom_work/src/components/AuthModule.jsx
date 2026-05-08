import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
      console.log("Начинаем регистрацию...");

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
        role: "user",
        createdAt: new Date().toISOString(),
      });

      console.log("Успех! Пользователь зарегистрирован и добавлен в базу.");
      closeMenu();
    } catch (err) {
      console.error("Ошибка Firebase:", err);
      setError("Ошибка регистрации: " + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    try {
      setError(""); // Очищаем красные ошибки от прошлых попыток
      console.log("Пытаемся войти под:", email);

      // Firebase проверяет логин и пароль
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("Успешный вход! C возвращением,", userCredential.user.email);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Ошибка входа:", err);

      if (err.code === "auth/invalid-credential") {
        setError("Неверный email или пароль.");
      } else {
        setError("Ошибка: " + err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");

      // Вызываем всплывающее окно Google
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;

      // Сохраняем пользователя в базу (или обновляем, если он уже был)
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          email: currentUser.email,
          name: currentUser.displayName,
          role: "user",
          // merge: true крайне важен, чтобы не перезаписать старые данные при повторном входе
        },
        { merge: true },
      );

      console.log("Успешный вход через Google:", currentUser.displayName);
    } catch (err) {
      console.error(err);
      setError("Ошибка Google авторизации: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Успешно вышли из аккаунта");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
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
              <p>Password: </p>
              <p>{user.password || "••••••••"}</p>
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

          {/* Жмет сюда -> срабатывает onSubmit формы -> handleLogin */}
          <button type="submit">Sign In</button>

          {/* 5. ДОБАВЛЕН onClick НА КНОПКУ РЕГИСТРАЦИИ */}
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
