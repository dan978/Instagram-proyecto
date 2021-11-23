const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const uuid = require("uuid");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.APIKEY);


async function sendMail({ to, subject, message }) {
    try {
    const msg = {
        to: to,
        from: process.env.SEND_FROM,
        subject: subject,
        html: message,
    };
    await sendgrid.send(msg);
    } catch (error) {
        console.error(error);
        throw new Error("Error enviando mail");
    }
}

async function uploadImage({ file, directory }) {
    // PHAT SUBIDA IMAGENES
    const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);

    // subdirectorio concreto de subida de esta imagen (con respecto al path anterior)
    const targetDir = path.join(uploadsDir, directory);

    // nos aseguramos que el directorio existe
    await fs.mkdir(targetDir, { recursive: true });

    // Cargamos la imagen en sharp
    const image = sharp(file.data);
    console.log(image)
    // Sacamos información de la imagen
    const infoPicture = await image.metadata();

    // Cambiamos el tamaño de la imagen si es más grande que 800px de ancho
    if (infoPicture.width > 800) {
        image.resize(800);
    }

    // generamos un nombre aleatorio para la imagen
    const filename = `${uuid.v4()}.jpg`;

    // guardamos la imagen en el directorio correcto
    await image.toFile(path.join(targetDir, filename));

    return filename;
}
async function changeGrey ({ file, directory }){
    // PHAT SUBIDA IMAGENES
    const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);

    // subdirectorio concreto de subida de esta imagen (con respecto al path anterior)
    const targetDir = path.join(uploadsDir, directory);

    // nos aseguramos que el directorio existe
    await fs.mkdir(targetDir, { recursive: true });

    // Cargamos la imagen en sharp
    const image = sharp(file ); 
    
    //cambiamos la imagen a blanco y negro
    const imageGray = await image.grayscale();

    // Sacamos información de la imagen
    const infoPicture = await image.metadata();

    // Cambiamos el tamaño de la imagen si es más grande que 800px de ancho
    if (infoPicture.width > 800) {
        image.resize(800);
    }

    // generamos un nombre aleatorio para la imagen
    const filename = `${uuid.v4()}.jpg`;

    // guardamos la imagen en el directorio correcto
    await image.toFile(path.join(targetDir, filename));

    return filename;

}
async function deleteImage( {file, directory} ) {
    const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);
    const imagePath = path.join(uploadsDir, directory, file);

    await fs.unlink(imagePath);
}

module.exports = {
    sendMail,
    uploadImage,
    deleteImage,
    changeGrey,
};
