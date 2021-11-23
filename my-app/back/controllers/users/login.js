const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function login(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //OBTENEMOS DATOS DEL BODY DE LA PETICIÓN
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Faltan datos de acceso");
    }

    let user;
    //OBTENEMOS DATOS DE USUARIO
    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE email = ?
            `,
        [email]
      );
    } catch (error) {
      throw new Error("No se ha podido obtener los datos de usuario");
    }

    //SI NO HAY USUARIO REGISTRADO CON ESE EMAIL, EMITIMOS ERROR
    if (user.length < 1) {
      throw new Error("No existe usuario con ese email");
    }

    const passwordDb = user[0].password;

    //COMPROBAR QUE EL USUARIO ESTÁ ACTIVADO
    if (user[0].active !== 1) {
      throw new Error(
        "El usuario no está activado, revisa la bandeja de entrada de tu email para activar tu usuario"
      );
    }

    //COMPARAMOS LA CONTRASEÑA QUE INDICA EL USUARIO CON LA ALMACENADA EN LA BASE DE DATOS
    const isValid = await bcrypt.compare(password, passwordDb);

    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }

    //CREAMOS UN OBJETO DÓNDE INDICAMOS INFORMACIÓN
    //PARA REGULAR ACCESOS EN LA APLICACIÓN
    const tokenInfo = {
      id: user[0].id,
      role: user[0].role,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.send({
      status: "ok",
      token: token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { login };
