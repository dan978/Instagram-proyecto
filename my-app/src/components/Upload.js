import { useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Redirect } from "react-router";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Upload = (props) => {
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [inputValue, setInputValue] = useLocalStorage("msg", "");
  const [token] = useContext(TokenContext);
  const fileInput = useRef();

  const fileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Subir múltiples ficheros (necesario atributo "multiple" en input, habría que adaptar también el backend)
    // const files = fileInput.current.files;

    // for (let i = 0; i < files.length; i++) {
    //   formData.append(`image[${i}]`, files[i]);
    // }

    const file = fileInput.current.files[0];

    formData.append("photo", file);
    const headers = new Headers();
    headers.append("Authorization", token);
    formData.append("description", inputValue);

    const response = await fetch("http://localhost:3060/photos/photo", {
      method: "POST",
      body: formData,
      headers: headers,
    });

    const body = await response.json();

    // console.log(body);

    if (response.ok) {
      setUploadedFile(body.filename);
      setUploaded(true);
    } else {
      console.error(body);
    }
  };
  return (
    <>
      {token && !uploaded ? (
        <div className="divRegister">
          <Link to={`/profile`}>
            <Button color="primary" variant="contained" size="small">
              Volver a tu perfil
            </Button>
          </Link>
          <form onSubmit={fileUpload}>
            <input
              type="file"
              ref={fileInput}
              accept="image/*" /* multiple */
            ></input>
            <input
              type="textarea"
              id="msginput"
              name="msginput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Breve descripción de la foto"
            ></input>
            <input type="submit" value="Subir archivo"></input>
          </form>
          {uploadedFile && (
            <>
              <p>Se ha subido correctamente tu imagen</p>
              <img
                src={`http://localhost:3060/static/photo/${uploadedFile}`}
                alt="Foto subida"
              ></img>
            </>
          )}
        </div>
      ) : (
        <Redirect to="/profile" />
      )}
    </>
  );
};

export default Upload;
