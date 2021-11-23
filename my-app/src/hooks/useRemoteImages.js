import {  useEffect, useState } from 'react';

const useRemoteImages = (id) => {
  const [photo, setPhoto] = useState({});
  useEffect(() => {
    const cargarPhoto = async () => {
    const res = await fetch(`http://localhost:3060/photos/${id}`);
    const fetchedImage = await res.json();
    setPhoto(fetchedImage);
  };
  cargarPhoto()
  }, [id]);
  
  return [photo, setPhoto];
  

};

export default useRemoteImages;

