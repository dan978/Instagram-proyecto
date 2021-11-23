import useRemoteImages from "../hooks/useRemoteImages";
import { useParams } from "react-router-dom";
import Photo from "../components/Photo";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const PhotoPage = (props) => {
  const { id } = useParams();
  const [photo] = useRemoteImages(id);

  return (
    <>  <Link to={`/`}>
      <Button
        color="primary"
        variant="contained"
        size="small"
        className="atras2"
      >
        Ir atrás
      </Button>
    </Link>
      <div>

        {Object.keys(photo).length && <Photo photo={photo} />}
      </div>
    </>
  );
};

export default PhotoPage;
