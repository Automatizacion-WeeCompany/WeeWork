import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

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
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      // Invocamos el comando y esperamos el objeto LoginResponse { success, role }
      const response = await invoke<LoginResponse>("validate_login", { 
        username, 
        password 
      });

      if (response.success) {
        // IMPORTANTE: Pasamos el rol obtenido a la función de éxito
        onLoginSuccess(response.role);
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      // Si Rust lanza un error (Err en Result), lo capturamos aquí
      setError("Error de conexión o credenciales inválidas.");
      console.error("Login error:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-overlay" style={{ 
      display: "flex", justifyContent: "center", alignItems: "center", 
      height: "100vh", backgroundColor: "#0f0f0f" 
    }}>
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: "#1a1a1a", padding: "40px", borderRadius: "12px", 
        border: "1px solid #333", width: "320px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#00d4ff", margin: "0 0 10px 0" }}>Acceso QA Suite</h2>
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
              width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", 
              backgroundColor: "#252525", color: "white", boxSizing: "border-box", outline: "none"
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ color: "#aaa", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>CONTRASEÑA</label>
          <input 
            type="password" 
            placeholder="Contraseña proporcionada por QA"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggingIn}
            autoComplete="current-password"
            style={{ 
              width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", 
              backgroundColor: "#252525", color: "white", boxSizing: "border-box", outline: "none"
            }}
          />
        </div>

        {error && <div style={{ color: "#ff4d4d", marginBottom: "20px", fontSize: "0.85rem", textAlign: "center" }}>{error}</div>}

        <button 
          type="submit" 
          disabled={isLoggingIn}
          style={{ 
            width: "100%", padding: "12px", backgroundColor: isLoggingIn ? "#444" : "#006ab3", 
            color: "white", border: "none", borderRadius: "6px", cursor: isLoggingIn ? "not-allowed" : "pointer", 
            fontWeight: "bold", transition: "0.3s" 
          }}
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