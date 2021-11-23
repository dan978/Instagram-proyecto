const jsonwebtoken = require("jsonwebtoken");
const { getConnection } = require("../db");

async function validAuth(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { authorization } = req.headers;

    //EMITIMOS ERROR SI NO EXISTE CABECERA DE AUTORIZACIÓN
    if (!authorization) {
      throw new Error("La petición debe incluír un token");
    }

    //COMPROBAR QUE EL TOKEN ES VÁLIDO Y DECODIFICARLO
    let tokenInfo;
    try {
      tokenInfo = jsonwebtoken.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw new Error("El token no es válido");
    }

    //COMPROBAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS
    let user;
    try {
      [user] = await connection.query(
        `
        SELECT *
        FROM users
        WHERE id=?
        `,
        [tokenInfo.id]
      );
    } catch (error) {
      throw new Error(
        "No se ha podido consultar el usuario en la base de datos"
      );
    }

    if (user.length < 1) {
      throw new Error("El usuario del token no existe en la base de datos");
    }

    req.auth = tokenInfo;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  validAuth,
};
