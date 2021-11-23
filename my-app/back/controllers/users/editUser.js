const { uploadImage } = require("../../helpers");
const { getConnection } = require("../../db");

async function editUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { name, email, lastname, description } = req.body;

    if (!email) {
      throw new Error("El campo email es obligatorio");
    }

    if (req.files) {
      //GESTIONAR SUBIDA DE IMAGENES
      let nameFile;
      try {
        nameFile = await uploadImage({
          file: req.files.picture,
          directory: "avatares",
        });
      } catch (error) {
        console.log(error);
        throw new Error("No se ha podido subir la imagen");
      }
      //ACTUALIZO EL USUARIO
      try {
        await connection.query(
          `
                UPDATE users
                SET name=?,
                email=?,
                avatar=?,
                lastname=?,
                description=?
                WHERE id=?
                `,
          [name, email, nameFile, lastname, description, req.auth.id]
        );
      } catch (error) {
        throw new Error("Ha habido un error al actualizar tu usuario ");
      }
    } else {
      try {
        await connection.query(
          `
                UPDATE users
                SET name=?,
                email=?,
                lastname=?,
                description=?
                WHERE id=?
                `,
          [name, email, lastname, description, req.auth.id]
        );
      } catch (error) {
        throw new Error("Ha habido un error al actualizar tu usuario ");
      }
    }
    res.send("tu usuario ha sido actualizo satisfactoriamente");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUser };
