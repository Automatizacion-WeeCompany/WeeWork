import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import weechobotBg from "../../src-tauri/icons/Weechobot1.jpg";
import logoW from "../../src-tauri/icons/W.png";

// Actualizamos la interfaz para que acepte el rol como argumento
interface LoginProps {
  onLoginSuccess: (role: string) => void;
}

// Definimos el tipo de respuesta que viene de Rust
interface LoginResponse {
  success: boolean;
  role: string;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername && !trimmedPassword) {
      setError("Ingresa tu usuario y contraseña.");
      return;
    }
    if (!trimmedUsername) {
      setError("Ingresa tu usuario.");
      return;
    }
    if (!trimmedPassword) {
      setError("Ingresa tu contraseña.");
      return;
    }

    setIsLoggingIn(true);

    try {
      // Invocamos el comando y esperamos el objeto LoginResponse { success, role }
      const response = await invoke<LoginResponse>("validate_login", { 
        username: trimmedUsername, 
        password: trimmedPassword 
      });

      if (response.success) {
        // IMPORTANTE: Pasamos el rol obtenido a la función de éxito
        onLoginSuccess(response.role);
      } else {
        setError("Usuario o contraseña incorrectos. Verifica tus datos.");
      }
    } catch (err) {
      // Si Rust lanza un error (Err en Result), lo capturamos aquí
      const raw = String(err ?? "");
      const normalized = raw.toLowerCase();
      if (
        normalized.includes("credenciales") ||
        normalized.includes("usuario o contraseña") ||
        normalized.includes("usuario") && normalized.includes("contraseña")
      ) {
        setError("Usuario o contraseña incorrectos. Verifica tus datos.");
      } else if (
        normalized.includes("conexión") ||
        normalized.includes("conexion") ||
        normalized.includes("connection") ||
        normalized.includes("network") ||
        normalized.includes("econnrefused") ||
        normalized.includes("failed to fetch")
      ) {
        setError("No se tiene conexión. Revisa tu red e inténtalo de nuevo.");
      } else {
        setError("No fue posible iniciar sesión. Inténtalo de nuevo.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-overlay" style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      height: "100vh",
      backgroundImage: `linear-gradient(var(--login-overlay), var(--login-overlay)), url(${weechobotBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative"
    }}>
      <form onSubmit={handleLogin} className="glass-panel-strong" style={{ 
        padding: "40px", width: "320px" 
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img 
            src={logoW} 
            alt="Logo Wee" 
            style={{ width: "64px", height: "64px", objectFit: "contain", marginBottom: "10px" }} 
          />
          <h2 style={{ color: "#00d4ff", margin: "0 0 10px 0" }}>WeeBot</h2>
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }}></div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#aaa", fontSize: "0.8rem", display: "block", marginBottom: "5px"}}>USUARIO</label>
          <input 
            type="text" 
            placeholder="Usuario proporcionado por QA"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggingIn}
            autoComplete="username"
            style={{ 
              width: "100%", padding: "12px", borderRadius: "6px", boxSizing: "border-box", outline: "none"
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ color: "#aaa", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>CONTRASEÑA</label>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Contraseña proporcionada por QA"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            autoComplete="current-password"
            style={{ 
              width: "100%", padding: "12px", borderRadius: "6px", boxSizing: "border-box", outline: "none"
            }}
          />
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", color: "#aaa", fontSize: "0.8rem" }}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              disabled={isLoggingIn}
              style={{ margin: 0 }}
            />
            Mostrar contraseña
          </label>
        </div>

        {error && <div style={{ color: "#ff4d4d", marginBottom: "20px", fontSize: "0.85rem", textAlign: "center" }}>{error}</div>}

        <button 
          type="submit" 
          disabled={isLoggingIn}
          className="btn btn-primary btn-block"
        >
          {isLoggingIn ? "Verificando..." : "Ingresar"}
        </button>
        <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: "10px" }}>
          ¿Olvidaste tu usuario o contraseña? Contacta al equipo de QA para recuperarlos.
        </p>
      </form>
    </div>
  );
}
