import { Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import PostComment from "./PostComment.js";
import PostLike from "./PostLike";
import { TokenContext } from "./TokenContextProvider";
import { useContext } from "react";
import DeletePhoto from "./DeletePhoto";


const Photo = (props) => {
  const data = props.photo.data;
  const img = data.photos[0].images;
  const description = data.description;
  const name = data.name;
  const likes = data.likes.length;
  const comments = data.comments;
  const userId = data.userid;
  const [token] = useContext(TokenContext);

  return (
    <div className="imgBody">

      <img className="photo"
        src={`http://localhost:3060/static/photo/${img}`}
        alt={`${description}`}
      ></img>
      <p>Descripción: {description} </p>
      <p>
        La foto fue subida por: <Link to={`/user/${userId}`}>{name}</Link>
      </p>
      {token && <PostLike id={data.id}></PostLike>}
      {token && <DeletePhoto id={data.id}></DeletePhoto>}
      <p className="likestext">Likes: {likes}</p>
      <p className="commentstext">Comentarios:</p>
      <CommentsList comments={comments}></CommentsList>
      {token && <PostComment id={data.id}></PostComment>}
    </div>
  );
};

export default Photo;
