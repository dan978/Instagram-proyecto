import { Link } from "react-router-dom";
const ImageBody = (props) => {
  const { id, userId, userName, content, date, img } = props;
  return (
    <div className="imgBody">
      <Link to={`/photo/${id}`}>
        <img
          src={`http://localhost:3060/static/photo/${img}`}
          alt="Foto nueva"
        ></img>
      </Link>
      <p>
        Esta foto fue subida por: <Link to={`/user/${userId}`}>{userName}</Link>
      </p>
      <div>
        <p>Descripción: {content}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ImageBody;
