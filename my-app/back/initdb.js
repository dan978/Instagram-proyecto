const { getConnection } = require("./db");
const bcrypt = require("bcrypt");
const { CLIEngine } = require("eslint");

async function main() {
    let connection;
    try { 
      connection = await getConnection();
      await connection.query(`SET FOREIGN_KEY_CHECKS=0`);
      await connection.query(`DROP TABLE IF EXISTS users`);
      await connection.query(`DROP TABLE IF EXISTS photos`);
      await connection.query(`DROP TABLE IF EXISTS likes`);
      await connection.query(`DROP TABLE IF EXISTS comments`);
      await connection.query(`DROP TABLE IF EXISTS users_photos`);

      await connection.query(`
      CREATE TABLE users( 
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        lastname VARCHAR(40),
        description VARCHAR(100),
        email VARCHAR(30) NOT NULL UNIQUE,
        avatar TINYTEXT,
        password VARCHAR(200),
        role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
        active BOOLEAN DEFAULT false,
        registrationDate DATETIME,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME NOT NULL
        )
      `);

    
      console.log("tablas creadas usuarios");

      await connection.query(`
      CREATE TABLE photos(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        description VARCHAR(50),
        images TINYTEXT,
        date DATETIME NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users (id)
        )
      `);

      console.log(`tablas creadas fotos`)

      await connection.query(`
      CREATE TABLE likes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        lik TINYINT NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users (id),
        id_photo INT UNSIGNED,
        date DATETIME NOT NULL,
        FOREIGN KEY (id_photo) REFERENCES photos(id)
        )
      `)

      console.log(`tablas creadas likes`)

      await connection.query(` 
      CREATE TABLE comments(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        commentary VARCHAR(100),
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        id_photo INT UNSIGNED,
        date DATETIME NOT NULL,
        FOREIGN KEY (id_photo) REFERENCES photos(id)
        )
      `);

      console.log(`tablas creadas comentarios`)

      await connection.query(`
      CREATE TABLE users_photos(
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        id_photo INT UNSIGNED,
        FOREIGN KEY (id_photo) REFERENCES photos(id),
        PRIMARY KEY (id_user, id_photo)
        )
      `);

      console.log(`tablas creadas usuarios_fotos`)

      const password = await bcrypt.hash("123456789", 10);

    await connection.query(`
        INSERT INTO users(
          registrationDate,
          name,
          email,
          password,
          role,
          active,
          lastUpdate,
          lastAuthUpdate
        )
        
        VALUES(
            UTC_TIMESTAMP,
            "admin",
            "danielborges978@gmail.com",
            "${password}",
            "admin",
            true,
            UTC_TIMESTAMP,
            UTC_TIMESTAMP
        )
        `);


    } catch (error) {
        console.error(error.message);
      } finally {
        console.log("Todo leído, liberando conexión");
        if (connection) connection.release();
        process.exit();
      }
    }
    
    main();
    