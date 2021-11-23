import { useState } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3060/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword, name }),
    });
  };
  return (
    <form id="register" onSubmit={register}>
      <label htmlFor="registerName">Nombre:</label>
      <input
        type="name"
        id="registerName"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="registerEmail">Correo:</label>
      <input
        type="email"
        id="registerEmail"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="registerPassword">Contraseña:</label>
      <input
        type="password"
        id="registerPassword"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="registerConfirmPassword">Confirmar contraseña:</label>
      <input
        type="password"
        id="registerConfirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default RegisterForm;
