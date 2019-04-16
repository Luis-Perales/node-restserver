/*El process es un objeto global que esta corriendo a lo largo de toda la 
aplicación */


// ===================================
//  Puerto
// ===================================
process.env.PORT = process.env.PORT || 3000;


// ===================================
//  Entorno
// ===================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ===================================
//  Base de datos
// ===================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = process.env.MONGO_URI; //con esto evitamos subir nuestras crenenciales
}
process.env.URLDB = urlDB;