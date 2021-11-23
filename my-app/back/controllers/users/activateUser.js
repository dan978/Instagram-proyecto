const { getConnection } = require("../../db");

async function activateUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { registrationCode } = req.params;

    //COMPROBAR QUE EXISTA USUARIO CON ESE CÓDIGO DE ACTIVACION
    let user;

    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE registrationCode = ?
            `,
        [registrationCode]
      );
    } catch (error) {
      new Error("No se pudo comprobar coincidencias");
    }
    //SI NO EXISTE, LANZO ERROR
    if (user.length < 1) {
      throw new Error(
        "No hay usuario pendiente de valicación con ese código de registro"
      );
    }

    //ACTIVAR USUARIO
    try {
      await connection.query(
        `
            UPDATE users
            SET active=true, registrationCode = NULL
            WHERE registrationCode = ?
            `,
        [registrationCode]
      );
    } catch (error) {
      throw new Error("No se pudo activar el usuario");
    }
    res.send({
      status: "ok",
      message: "El usuario fue activado correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { activateUser };
