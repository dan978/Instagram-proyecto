import { TokenContext } from "./TokenContextProvider";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router";

const PostComment = (props) => {
  const [token] = useContext(TokenContext);
  const [comment, setComment] = useState("");
  const { id } = props;
  const history = useHistory();
  const postComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3060/photo/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json();
    if (res.ok) {
      history.go();
    }
  };

  return (
    <form onSubmit={postComment} className="formComent">
      <label htmlFor="comment">Escribe aqui tu comentario</label>
      <input
        className="comments"
        type="textarea"
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input type="submit" value="Publicar comentario"></input>
    </form>
  );
};

export default PostComment;
