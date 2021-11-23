import { Link, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import useUserInfo from "../hooks/useUserInfo";
import decodeTokenData from "../utils/decodeTokenData";
import useRemoteUserPhotos from "../hooks/useRemoteUserPhotos";
import UserPhotos from "../components/UserPhotos";
import InfoProfile from "../components/InfoProfile";

const ProfilePage = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const idUser = decodeTokenData(token)?.id;
  const [userInfo] = useUserInfo(idUser);
  const [photos] = useRemoteUserPhotos(idUser);
  const [info] = useUserInfo(idUser);

  return (
    <>
      {token ? (
        <div>
          <Link to={`/upload`}>
            <Button
              className="button"
              color="primary"
              variant="contained"
              size="small"
            >
              Subir foto
            </Button>
          </Link>
          <Link to={`/profile/edit`}>
            <Button
              className="button"
              color="primary"
              variant="contained"
              size="small"
            >
              Editar perfil
            </Button>
          </Link>
          <Link to={`/`}>
            <Button
              className="button"
              color="primary"
              variant="contained"
              size="small"
            >
              Pagina principal
            </Button>
          </Link>
          <Button
            className="button"
            onClick={() => setToken("")}
            variant="contained"
            color="primary"
            size="small"
          >
            Sign out
          </Button>
          {Object.keys(userInfo).length && <InfoProfile userInfo={userInfo} />}

          {!photos.error && Object.keys(photos).length && (
            <>
              <p>Galeria de fotos:</p>
              <UserPhotos photo={photos} userInfo={info} />
            </>
          )}
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </>
  );
};

export default ProfilePage;
