const { getConnection } = require("../../db");

async function addLike(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de la entrada del diario de req.params
    const { idPhoto } = req.params;

    // Saco los votos de req.body
    const { like } = req.body;

    // Compruebo que los votos tienen un valor correcto
    const validLikes = ["1"];

    if (!validLikes.includes(like)) {
      throw new Error("No se le dio like");
    }

    // Compruebo que la entrada que queremos darle like existe

    const [result] = await connection.query(
      `
      SELECT * 
      FROM photos
      WHERE id=?
    `,
      [idPhoto]
    );

    if (result.length < 1) {
      throw new Error("La foto que quieres darle like no existe");
    }

    // Compruebo que el usuario del token no dio a like previamente la entrada
    const [existingVote] = await connection.query(
      `
      SELECT *
      FROM likes
      WHERE id_user=? AND id_photo=?
    `,
      [req.auth.id, idPhoto]
    );

    if (existingVote.length > 0) {
      throw new Error("Ya le diste like a esta foto");
    }

    // Añado el like a la base de datos
    await connection.query(
      `
      INSERT INTO likes(lik, id_user, id_photo, date)
      VALUES(?,?,?,?)
    `,
      [like, req.auth.id, idPhoto, new Date()]
    );

    // Doy una respuesta
    res.send({
      status: "ok",
      message: `Votaste correctamente la entrada con id ${idPhoto}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { addLike };
