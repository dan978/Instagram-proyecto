import Photos from "./Photos";

const UserPhotos = (props) => {
  const data = props.photo;
  const name = props.userInfo?.name;
  const arrayPhotos = data.map((data) => (
    <Photos
      key={data.id}
      id={data.id}
      userId={data.id_user}
      userName={name}
      img={data.images}
      description={data.description}
      date={data.date}
    ></Photos>
  ));
  return <ul>{arrayPhotos}</ul>;
};

export default UserPhotos;
