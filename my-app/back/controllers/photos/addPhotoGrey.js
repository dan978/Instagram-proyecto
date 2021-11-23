const { getConnection } = require("../../db");
const { changeGrey } = require("../../helpers");

async function addPhotoGrey(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // id del usuario
    const { id } = req.params;

    const { description } = req.body;

    // Guardamos la foto enviada en un directorio y sacamos el nombre del fichero
    let savedPhotoName;

    if (req.files && req.files.photo) {
      savedPhotoName = await changeGrey({
        file: req.files.photo.data,
        directory: "photo",
      });
    } else {
      throw new Error("No subiste ninguna foto");
    }

    // Actualizamos la base de datos
    await connection.query(
      `
        INSERT INTO photos(date, images, id_user, description)
        VALUES(?,?,?,?)
    `,
      [new Date(), savedPhotoName, req.auth.id, description]
    );

    // Devolvemos una respuesta
    res.send({
      status: "ok",
      message: `Se añadió una foto en blanco y negro a la entrada del usuario con id ${req.auth.id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addPhotoGrey,
};
