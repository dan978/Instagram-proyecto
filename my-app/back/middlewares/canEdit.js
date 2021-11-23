const { getConnection } = require("../db");

async function canEdit(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Sacamos la id de la entrada de req.params;
    const { idPhoto } = req.params;

    // Seleccionamos la entrada
    const [result] = await connection.query(
      `
      SELECT id_user
      FROM photos
      WHERE id=?
    `,
      [idPhoto]
    );

    // Si no tenemos resultados devolvemos un error de que la foto no existe
    if (result.length < 1) {
      throw new Error("La foto no existe");
    }

    // Compruebo que el usuario del token es el que creo la foto

    const entry = result[0];

    if (req.auth.id !== entry.id_user && req.auth.role !== "admin") {
      throw new Error("No realizar esta acción sobre esta foto");
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  canEdit,
};
