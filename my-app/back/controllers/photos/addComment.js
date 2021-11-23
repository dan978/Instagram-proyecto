const { getConnection } = require("../../db");

async function addComment(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { idPhoto } = req.params;

    const date = new Date();

    // Comprobamos que en el body vienen todos los datos necesarios
    const { comment } = req.body;
    const id = req.auth.id;
    // Actualizamos el comentario
    await connection.query(
      `
      INSERT INTO comments(
        commentary,
        id_user,
        id_photo,
        date
        )
    VALUES(?,?,?,?)
    `,
      [comment, req.auth.id, idPhoto, date]
    );

    // devolvemos una respuesta

    res.send({
      status: "ok",
      message: `Comentario añadido a la foto con id ${idPhoto} `,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { addComment };
