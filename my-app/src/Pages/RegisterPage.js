import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {!token ? (
        <div className="divRegister">
          <h2 style={{ fontWeight: "600" }}>Pagina de registro de Instanow</h2>
          <RegisterForm />
          <p>
            ¿Ya tienes cuenta?
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Haz login
            </Link>
          </p>
          <p>
            <Link to="/" style={{ fontWeight: "bold" }}>
              Volver a la pagina pricipal de Instanow.
            </Link>
          </p>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default RegisterPage;
