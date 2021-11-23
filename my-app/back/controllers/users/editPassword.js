const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");

async function editPassword(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { oldPassword, newPassword, newPassword2 } = req.body;

    const { id } = req.params;

    if (newPassword !== newPassword2) {
      throw new Error("La nueva contraseña no coincide");
    }

    //OBTENGO USUARIO EN BASE AL ID DE LA RUTA
    let existingUser;
    try {
      [existingUser] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("No se pudo buscar al usuario en la base de datos");
    }

    //OBTENGO LA CONTRASEÑA CODIFICADA DEL USUARIO EN LA BASE DE DATOS
    const passwordCoded = existingUser[0].password;

    //COMPARAMOS LA CONTRASEÑA DEL USUARIO DEL BODY CON LA DE LA BASE DE DATOS
    try {
      const isValid = await bcrypt.compare(oldPassword, passwordCoded);
      if (isValid === false) {
        throw new Error(
          "La contraseña introducida no coincide con la depositada en base de datos"
        );
      }
    } catch (error) {
      throw new Error("la contraseña anterior no es correcta");
    }

    let passwordDb;
    try {
      passwordDb = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      throw new Error("la contraseña no se pudo codificar");
    }

    try {
      await connection.query(
        `
            UPDATE users
            SET password=?
            WHERE id=?
            `,
        [passwordDb, id]
      );
    } catch (error) {
      throw new Error("El usuario no se pudo actualizar");
    }

    res.send("Contraseña actualizada");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editPassword };
