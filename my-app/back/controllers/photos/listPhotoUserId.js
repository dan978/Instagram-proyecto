const { getConnection } = require("../../db");

async function listPhotoUserId(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //OBTENEMOS ID DE REQ.PARAMS - ES UN STRING
    const { idUser } = req.params;

    let photos;
    //OBTENEMOS DATOS USUARIO DE BASE DE DATOS
    try {
      [photos] = await connection.query(
        `
            SELECT *
            FROM photos
            WHERE id_user=?
            `,
        [idUser]
      );
    } catch (error) {
      throw new Error("no se ha podido obtener fotos");
    }

    if (photos.length < 1) {
      throw new Error("este usuario no tiene fotos en la base de datos");
    }

    res.send(photos);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listPhotoUserId };
