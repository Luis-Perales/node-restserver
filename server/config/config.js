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
    urlDB = 'mongodb+srv://luis:qD6DUGVtQYD4wWFF@cluster0-vn31e.mongodb.net/cafe';
}
process.env.URLDB = urlDB;