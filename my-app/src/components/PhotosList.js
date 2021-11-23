import Photos from "./Photos";

const PhotosList = (props) => {
  const { photos } = props;
  const arrayPhotos = photos.map((photo) => (
    <Photos
      key={photo.id}
      id={photo.id}
      userId={photo.id_user}
      userName={photo.userName}
      img={photo.images}
      description={photo.description}
      date={photo.date}
    ></Photos>
  ));
  return <ul>{arrayPhotos}</ul>;
};

export default PhotosList;
