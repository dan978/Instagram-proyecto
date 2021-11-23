require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// CONTROLADORES DE USUARIO
const { createUser } = require("./controllers/users/createUser");
const { activateUser } = require("./controllers/users/activateUser");
const { login } = require("./controllers/users/login");
const { getUser } = require("./controllers/users/getUser");
const { editUser } = require("./controllers/users/editUser");
const { editPassword } = require("./controllers/users/editPassword");
const { mailRecover } = require("./controllers/users/mailRecover");
const { resetPassword } = require("./controllers/users/resetPassword");
const { deleteUser } = require("./controllers/users/deleteUser");

// CONTROLADORES DE FOTOS
const { addPhoto } = require("./controllers/photos/addPhoto");
const { addPhotoGrey } = require("./controllers/photos/addPhotoGrey");
const { getPhoto } = require("./controllers/photos/getPhoto");
const { listPhotos } = require("./controllers/photos/listPhotos");
const { editGreyScale } = require("./controllers/photos/editGreyScale");
const { addLike } = require("./controllers/photos/addLike");
const { addComment } = require("./controllers/photos/addComment");
const { deletePhoto } = require("./controllers/photos/deletePhoto");
const { listPhotoUserId } = require("./controllers/photos/listPhotoUserId");

//MIDDLEWARES
const { validAuth } = require("./middlewares/validAuth");
const { isSameUser } = require("./middlewares/isSameUser");
const { isAdmin } = require("./middlewares/isAdmin");
const { canEdit } = require("./middlewares/canEdit");

//APLICAMOS MIDDLEWARES GENERALES DE USO
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use("/static", express.static("./static/uploads"));

//MIDDLEWARES ENDPOINTS GESTION USUARIOS
// CREAR USUARIO
app.post("/register", createUser);

// ACTIVAR USUARIO
app.get("/activate/:registrationCode", activateUser);

// LOGIN
app.post("/login", login);

// DATOS DE USUARIO
app.get("/user/:id", getUser);

// EDITAR USUARIO
app.put("/user/edit/:id", validAuth, isSameUser, editUser);

// EDITAR PASWORD
app.put("/user/password/:id", validAuth, isSameUser, editPassword);

//RECUPERAR PASWORD
app.put("/recoverPassword", mailRecover);

// BORRAR USUARIO
app.delete("/user/:id", validAuth, isSameUser, deleteUser);

//RESETEAR CONTRASEÑA
app.put("/reset/:code", resetPassword);

//MIDDLEWARES ENDPOINTS GESTION FOTOS

//SUBIR FOTO
app.post("/photos/photo", validAuth, addPhoto);

//SUBIR FOTO EN BLANCO Y NEGRO
app.post("/photos/photoGrey", validAuth, addPhotoGrey);

//VER FOTO
app.get("/photos/:idPhoto", getPhoto);

//LISTAR FOTOS
app.get("/photos", listPhotos);

//listar fotos usuario
app.get("/photos/user/:idUser", listPhotoUserId);

//APLICAR FILTRO DE GRISES
app.post("/grey/:idPhoto", validAuth, canEdit, editGreyScale);

//BORRAR FOTO
app.delete("/photos/delete/:idPhoto", validAuth, canEdit, deletePhoto);

//AGREGAR COMENTARIO
app.post("/photo/:idPhoto/comment", validAuth, addComment);

//DAR LIKE
app.post("/photos/:idPhoto/addLike", validAuth, addLike);

//MIDDLEWARE DE GESTION DE ERRORES
app.use(function (error, req, res, next) {
  if (error) {
    res.status(error.httpStatus || 500).send({ error: error.message });
  }
});

//MIDDLEWARE DE GESTIÓN DE RUTA NO ENCONTRADA
app.use(function (req, res) {
  res.send("No se ha encontrado la ruta");
});

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
