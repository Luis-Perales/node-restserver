// Modelo usuario
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Cascaron para crear schemas en mongo
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido' //{VALUE} inyectamos lo que el usuario envie
};

// Definir nuestro esquema
/*En este caso emos definido un nuevo esquema pero tenemos que definirle las reglas
y controles que este usuarioSchema va a tener, es decir, los campos que va a tener la colección
#required: [true, 'El nombre es necesario']# --> el nombre es requerido y si no cumple le mendo un mensaje
que el nombre es necesario*/
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//toJson siempre se llama cuando se intenta imprimir
//sacamos el pass del json para evitar mostarlo
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

/*Especificamos a nuestro esquema que utilize un pliguns,
También le podemo pasar un mensaje */
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


// Exportamos el modelo, le ponemos un nombre y queremos que tenga todas las configuraciones del
//usuarioSchema
module.exports = mongoose.model('Usuario', usuarioSchema);