import PhotosList from "../components/PhotosList";
import SearchPhoto from "../components/SearchPhoto";
import useLocalStorage from "../hooks/useLocalStorage";
import useSearchedPhotos from "../hooks/useSearchedPhotos";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";

const Instanow = (props) => {
  const [inputValue, setInputValue] = useLocalStorage("photo", "");
  const [photos] = useSearchedPhotos(inputValue);
  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="instanow">
      <h1>Instanow</h1>
      {!token ? (
        <>
          <Link to={`/register`}>
            <Button color="primary" variant="contained" size="small">
              Register
            </Button>
          </Link>
          <Link to={`/login`}>
            <Button color="primary" variant="contained" size="small">
              Login
            </Button>
          </Link>{" "}
        </>
      ) : (
        <>
          <Button
            onClick={() => setToken("")}
            variant="contained"
            color="primary"
            size="small"
          >
            Sign out
          </Button>
          <Link to={`/profile`}>
            <Button
              className="profile"
              color="primary"
              variant="contained"
              size="small"
            >
              Perfil
            </Button>
          </Link>
        </>
      )}

      <SearchPhoto inputValue={inputValue} setInputValue={setInputValue} />
      {photos.length > 0 && <PhotosList photos={photos} />}
      {photos.length < 1 && <p>Ninguna foto sale en tu búsqueda</p>}
    </div>
  );
};

export default Instanow;
