const { getConnection } = require("../../db");

async function getUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //OBTENEMOS ID DE REQ.PARAMS - ES UN STRING
    const { id } = req.params;

    let user;
    //OBTENEMOS DATOS USUARIO DE BASE DE DATOS
    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("no se ha podido obtener usuario");
    }

    if (user.length < 1) {
      throw new Error("el usuario no existe en la base de datos");
    }

    res.send(user);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getUser };
