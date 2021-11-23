const { getConnection } = require("../../db");

async function listPhotos(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { search } = req.query;

    let result;

    // Seleccionamos todas las fotos
    if (search) {
      [result] = await connection.query(
        `
      SELECT photos.*, users.name AS userName
      FROM photos
      LEFT JOIN users ON photos.id_user = users.id
      WHERE photos.description LIKE CONCAT("%", ? , "%")
      ORDER BY date DESC
    `,
        [search, search]
      );
    } else {
      [result] = await connection.query(`
      SELECT photos.*, users.name AS userName
      FROM photos
      LEFT JOIN users ON photos.id_user = users.id
      ORDER BY date DESC
    `);
    }

    // Devuelvo el array
    res.send(result);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listPhotos };
