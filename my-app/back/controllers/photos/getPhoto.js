const { getConnection } = require("../../db");

async function getPhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { idPhoto } = req.params;
    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT photos.id, photos.date, photos.description, users.name, users.id AS userid
      FROM photos
      LEFT JOIN users ON photos.id_user = users.id
      WHERE photos.id=?
    `,
      [idPhoto]
    );

    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    const data = result[0];

    // Saco de la base de datos las fotos asociadas a esta entrada

    const [photos] = await connection.query(
      `
      SELECT date, images
      FROM photos
      WHERE photos.id=?
    `,
      [idPhoto]
    );

    const [likes] = await connection.query(
      `
      SELECT lik
      FROM likes
      WHERE id_photo=?
      `,
      [idPhoto]
    );

    const [comments] = await connection.query(
      `
      SELECT commentary
      FROM comments
      WHERE id_photo=?
      `,
      [idPhoto]
    );

    data.photos = photos;
    data.likes = likes;
    data.comments = comments;

    // Devuelvo los datos
    res.send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getPhoto,
};
