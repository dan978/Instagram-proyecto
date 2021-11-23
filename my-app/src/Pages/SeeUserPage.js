import useRemoteUserPhotos from "../hooks/useRemoteUserPhotos";
import { Link, useParams } from "react-router-dom";
import UserPhotos from "../components/UserPhotos";
import useUserInfo from "../hooks/useUserInfo";
import { Button } from "@material-ui/core";

const SeeUser = (props) => {
  const { id } = useParams();
  const [photos] = useRemoteUserPhotos(id);
  const [info] = useUserInfo(id);

  return (
    <div>
      <Link to={`/`}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          className="atras"
        >
          Ir atrás
        </Button>
      </Link>
      <p>Galería del usuario</p>
      {Object.keys(photos).length && (
        <UserPhotos photo={photos} userInfo={info} />
      )}
    </div>
  );
};

export default SeeUser;
