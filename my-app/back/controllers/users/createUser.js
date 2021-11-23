const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { sendMail } = require("../../helpers");

async function createUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //OBTENER LOS DATOS DE LA REQUEST
    const { email, password, confirmPassword, name } = req.body;
    if (password !== confirmPassword){
      throw new Error("Las contraseñas no coinciden")
    }
    //COMPROBAR QUE LOS DATOS EXISTAN
    if (!email || !password) {
      throw new Error("Faltan datos para crear un usuario");
    }

    let user;
    //COMPROBAR QUE NO EXIXTA UN USUARIO CON ESE EMAIL
    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE email=?
            `,
        [email]
      );
    } catch (error) {
      next(error);
    }

    if (user.length > 0) {
      throw new Error("El usuario ya existe en la base de datos");
    }

    //CODIFICAR PASSWORD
    const passwordDb = await bcrypt.hash(password, 10);

    //CREAR CÓDIGO DE REGISTRO PARA FUTURA ACTIVACIÓN
    const registrationCode = crypto
      .randomBytes(20)
      .toString("hex")
      .slice(0, 20);

    //INTRODUCIMOS LOS DATOS EN LA BASE DE DATOS
    try {
      await connection.query(`
            INSERT INTO users(
                registrationDate,
                email,
                password,
                name,
                registrationCode,
                lastUpdate,
                lastAuthUpdate
                )
            VALUES(
                UTC_TIMESTAMP,
                "${email}",
                "${passwordDb}",
                "${name}",
                "${registrationCode}",
                UTC_TIMESTAMP,
                UTC_TIMESTAMP
            )
            `);
    } catch (error) {
      next(error);
    }

    //ENVIO DE EMAIL DE CONFIRMACIÓN DE CREACIÓN DE USUARIO
    const validationLink = `${process.env.DOMINIO}/activate/${registrationCode}`;

    await sendMail({
      to: email,
      subject: "Te acabas de registrar en Photonow",
      message: `
            <p>Muchas gracias por registrarte en Photonow,
            pulsa el siguiente link para activar tu usuario:</p>
            <a href=${validationLink}>Activar usuario</a>
            
          `,
    });

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createUser };
