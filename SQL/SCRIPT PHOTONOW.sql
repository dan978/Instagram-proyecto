use Photonow;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(20) NOT NULL,
apellidos VARCHAR(40),
descripcion VARCHAR(100),
email VARCHAR(30) NOT NULL UNIQUE,
avatar TINYTEXT,
contrasena VARCHAR(20),
rol ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
activo BOOLEAN DEFAULT false,
codigoRegistro TINYTEXT,
codigoActCont TINYTEXT,
ultimaAct DATETIME NOT NULL,
ultimaAutorizacion DATETIME NOT NULL
);

CREATE TABLE fotos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
descripcion VARCHAR(50),
fecha DATETIME NOT NULL,
lastUpdate DATETIME NOT NULL,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE likes(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
lik TINYINT NOT NULL,
fecha DATETIME NOT NULL,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
id_foto INT UNSIGNED,
FOREIGN KEY (id_foto) REFERENCES fotos(id)
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fecha DATETIME NOT NULL,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
id_foto INT UNSIGNED,
FOREIGN KEY (id_foto) REFERENCES fotos(id)
);

CREATE TABLE usuario_fotos(
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
id_foto INT UNSIGNED,
FOREIGN KEY (id_foto) REFERENCES fotos(id),
PRIMARY KEY (id_usuario, id_foto)
);

SET FOREIGN_KEY_CHECKS = 1;