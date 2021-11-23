import { TokenContext } from "../components/TokenContextProvider";
import { useContext, useState } from "react";
import { Redirect } from "react-router";
import eliminated from "../images/delete.png";

const DeletePhoto = (props) => {
  const [token] = useContext(TokenContext);
  const { id } = props;
  const [error, setError] = useState();
  const [eliminate, setEliminate] = useState(false);
  
  const deletePhoto = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3060/photos/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    if (res.ok) {
      setEliminate(true);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <>
      {token && !eliminate? (
       <img
          className="delete"
          onClick={deletePhoto}
          src={eliminated}
          alt={"delete"}
        ></img>
      ) : (
        <Redirect to="/profile" />
      )}
      {error && <p className="likeerror">{error}</p>}
    </>
  );
};

export default DeletePhoto;
