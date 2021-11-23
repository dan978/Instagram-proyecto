import defaultAvatar from "../images/avatar.jpg";
const InfoProfile = (props) => {
  const { name, lastname, avatar, description } = props.userInfo;

  return (
    <div className="infoProfile">
      <h2>Bienvenid@ a tu perfil {name}</h2>
      <p>Nombre: {name}</p>
      <p>Apellido: {lastname}</p>

      {avatar ? (
        <img
          className="profileImg"
          src={`http://localhost:3060/static/avatares/${avatar}`}
          alt={name}
        ></img>
      ) : (
        <img className="profileImg" src={defaultAvatar} alt={name}></img>
      )}

      {description ? <p>Descripción: {description}</p> : null}
    </div>
  );
};

export default InfoProfile;
