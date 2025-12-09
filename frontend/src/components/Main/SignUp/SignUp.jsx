import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Endpoint correcto según tu backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password
      });

      if (res.status === 201) {
        alert(res.data.message);
        navigate("/login");
      }

    } catch (err) {
      const message =
        err.response?.data?.error || "Error al conectar con el servidor";

      setError(message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="auth-form">
      <h2>Crear cuenta</h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

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

      <button type="submit">Registrarse</button>

      {/* Mensaje de error con tu clase msg-error */}
      {error && <p className="msg-error">{error}</p>}

      {/* Texto inferior con tu clase redirect-text */}
      <p className="redirect-text">
        ¿Ya tienes cuenta?{" "}
        <span onClick={() => navigate("/login")}>Inicia sesión</span>
      </p>
    </form>
  );
};

export default SignUp;
