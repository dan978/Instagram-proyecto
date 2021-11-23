const { getConnection } = require("../../db");

async function deleteUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    try {
      //BORRAMOS USUARIO DE LA BASE DE DATOS
      await connection.query(
        `
            DELETE 
            FROM users
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("No se pudo borrar el usuario de la base de datos");
    }

    res.send({ status: "ok", message: "Usuario borrado satisfactoriamente" });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteUser };
