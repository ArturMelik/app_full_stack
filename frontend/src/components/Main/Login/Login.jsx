import React from "react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardar el token
      localStorage.setItem("token", data.token);

      setSuccess("Login correcto. Bienvenido!");
      console.log("TOKEN:", data.token);

      window.location.href = "/product"; // o window.location.reload();

      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Error del servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Entrar</button>

      {error && <p className="msg-error">{error}</p>}
      {success && <p className="msg-success">{success}</p>}
    </form>
  );
}

export default Login;
