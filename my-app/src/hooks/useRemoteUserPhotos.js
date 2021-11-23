import { useEffect, useState } from "react";

const useRemoteUserPhotos = (idUser) => {
  const [photo, setPhoto] = useState({});
  useEffect(() => {
    const cargarPhoto = async () => {
      const res = await fetch(`http://localhost:3060/photos/user/${idUser}`);
      const fetchedImage = await res.json();
      setPhoto(fetchedImage);
    };
    cargarPhoto();
  }, [idUser]);

  return [photo, setPhoto];
};

export default useRemoteUserPhotos;
