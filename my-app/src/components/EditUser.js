import useUserInfo from "../hooks/useUserInfo";
import { TokenContext } from "./TokenContextProvider";
import decodeTokenData from "../utils/decodeTokenData";
import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const EditUser = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const [user] = useUserInfo(decodedToken.id);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const avatarInput = useRef();
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name || user.name);
    formData.append("lastname", lastName || user.lastname);
    formData.append("email", email || user.email);
    formData.append("description", description || user.description);
    if (avatarInput.current.files[0]) {
      formData.append("picture", avatarInput.current.files[0]);
    }

    const res = await fetch(`http://localhost:3060/user/edit/${user.id}`, {
      method: "PUT",
      headers: { Authorization: token },
      body: formData,
    });
    if (res.ok) history.push("/profile");
  };
  return (
    <>
      <Link to={`/profile`}>
        <Button
          className="profile"
          color="primary"
          variant="contained"
          size="small"
        >
          Volver a tu perfil
        </Button>
      </Link>
      {Object.keys(user).length && (
        <form onSubmit={updateUser} className="divRegister">
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label htmlFor="lastName">Apellido:</label>
          <input
            id="lastName"
            placeholder={user.lastname}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label htmlFor="description">Descripción:</label>
          <input
            id="description"
            placeholder={user.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <label htmlFor="avatar">Avatar:</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            ref={avatarInput}
          ></input>

          <input type="submit" value="Guardar"></input>
        </form>
      )}
    </>
  );
};

export default EditUser;
