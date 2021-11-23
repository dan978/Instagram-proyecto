import EditUser from "../components/EditUser";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";

const ProfileEditPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      <EditUser></EditUser>
    </>
  );
};

export default ProfileEditPage;
