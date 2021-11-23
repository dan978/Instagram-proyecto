import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";

const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
        <div className="divRegister">
          <h2 style={{ fontWeight: "600" }}>Login</h2>
          <LoginForm />
          <p>
            ¿No tienes cuenta?
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Regístrate
            </Link>
          </p>
          <p>
            <Link to="/" style={{ fontWeight: "bold" }}>
              Volver a la pagina pricipal de Instanow.
            </Link>
          </p>
        </div>
      ) : (
        <Redirect to="/profile" />
      )}
    </>
  );
};

export default LoginPage;
