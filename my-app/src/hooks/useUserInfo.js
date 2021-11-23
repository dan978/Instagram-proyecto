import { useEffect, useState } from "react";

const useUserInfo = (idUser) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const cargarUser = async () => {
      const res = await fetch(`http://localhost:3060/user/${idUser}`);
      const fetchedUser = await res.json();
      setUser(fetchedUser[0]);
    };
    cargarUser();
  }, [idUser]);

  return [user, setUser];
};

export default useUserInfo;
