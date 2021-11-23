const { getConnection } = require("../../db");
const { deleteImage } = require("../../helpers");

async function deletePhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //sacamos la id de la entrada que queremos borrar
    const { idPhoto } = req.params;

    const [photos] = await connection.query(
      `
      SELECT images
      FROM photos
      WHERE id=?
    `,
      [idPhoto]
    );

    // Borramos la foto del disco
    await deleteImage({
      file: photos[0].images,
      directory: "photo",
    });

    // borramos la entrada

    await connection.query(`SET FOREIGN_KEY_CHECKS=0`);

    await connection.query(
      `
      DELETE FROM photos
      WHERE id=?
    `,
      [idPhoto]
    );

    // devolvemos una respuesta
    res.send({
      status: "ok",
      message: `La foto con id ${idPhoto} fue borrada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deletePhoto };
