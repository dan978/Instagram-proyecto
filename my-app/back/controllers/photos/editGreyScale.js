const { getConnection } = require("../../db");
const fs = require("fs").promises;
const path = require("path");
const { changeGrey } = require("../../helpers");
const { deleteImage } = require("../../helpers");

async function editGreyScale(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    //CONSEGUIMOS EL ID DE LA FOTO Y SUS DATOS
    const { idPhoto } = req.params;

    const [result] = await connection.query(
      `
            SELECT * 
            FROM photos
            WHERE id=?
            `,
      [idPhoto]
    );

    const pic = result[0].images;

    const imageBuffer = await fs.readFile(
      path.join(__dirname, `../../static/uploads/photo/${pic}`)
    );

    //CAMBIAMOS LA IMAGEN A BLANCO Y NEGRO
    try {
      await changeGrey({
        file: imageBuffer,
        directory: "photo",
      });
    } catch (error) {
      throw new Error("La imagen no se pudo cambiar a blanco y negro");
    }

    //AÑADIMAS LA NUEVA IMAGEN AL SERVIDOR
    try {
      await connection.query(
        `
                INSERT INTO photos(date, images, id_user)
                VALUES(?,?,?)
            `,
        [new Date(), pic, req.auth.id]
      );
    } catch (error) {
      throw new Error("La nueva no se pudo añadir al servidor");
    }

    //BORRAMOS LA IMAGEN ANTIGUA
    try {
      await deleteImage({
        file: pic,
        directory: "photo",
      });
    } catch (error) {
      throw new Error("La imagen no pudo ser borrada");
    }
    //BORRAMOS LOS DATOS DE LA IMAGEN ANTIGUA DEL SERVIDOR
    try {
      await connection.query(`SET FOREIGN_KEY_CHECKS=0`);
      await connection.query(
        `
                DELETE FROM photos
                WHERE id=?
                `,
        [idPhoto]
      );
    } catch (error) {
      throw new Error("La imagen no pudo ser borrada del servidor");
    }

    res.send({
      status: "ok",
      message: "Imagen convertida a blanco y negro",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editGreyScale };
