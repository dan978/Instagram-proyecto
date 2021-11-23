const { getConnection } = require("../../db");
const { sendMail } = require("../../helpers");
const crypto = require("crypto");

async function mailRecover(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { email } = req.body;

    let user;

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
      throw new Error("No se ha podido buscar un usuario en la base de datos");
    }

    if (user.length < 1) {
      throw new Error(
        "No existe un usuairo con la dirección de email indicada"
      );
    }

    const code = crypto.randomBytes(20).toString("hex").slice(0, 20);

    try {
      await connection.query(
        `
            UPDATE users
            SET registrationCode = ?
            WHERE email = ?
            `,
        [code, email]
      );
    } catch (error) {
      throw new Error("No se ha podido actualizar el usuario");
    }

    const recoverLink = `${process.env.DOMINIO}/reset/${code}`;
    await sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      message: `
            Hola, se ha solicitado recuperar tu contraseña, puedes resetear tu contraseña en el siguiente enlace:

            ${recoverLink}
          `,
    });

    res.send("enviado");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { mailRecover };
