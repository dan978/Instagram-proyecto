import { TokenContext } from "../components/TokenContextProvider";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import likeLogo from "../images/like.png";
const PostLike = (props) => {
  const [token] = useContext(TokenContext);
  const { id } = props;
  const history = useHistory();
  const [error, setError] = useState();
  const postLike = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3060/photos/${id}/addLike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ like: "1" }),
    });
    if (res.ok) {
      history.go();
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <>
      <img className="like" onClick={postLike} src={likeLogo} alt={"like"}></img>
      {error && <p className="likeerror">{error}</p>}
    </>
  );
};

export default PostLike;
