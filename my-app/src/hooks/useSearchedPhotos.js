import { useState, useEffect } from "react"

const useSearchedPhotos = (inputValue) => {
    const [photos, setPhotos] = useState ([])
  useEffect (() => {
    const loadPhotos = async () => {

    const res = await fetch(`http://localhost:3060/photos?search=${inputValue}`);

    const searchedPhotos = await res.json();

    setPhotos (searchedPhotos)
    }
    loadPhotos()
  }, [inputValue] )
  return [photos, setPhotos]
}

export default useSearchedPhotos