const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();



app.get('/usuario', function(req, res) {
    //Los parametros opcionales caen dentro de un objeto llamado req.query, y este query yo puedo suponer que va a venir
    //una variable desde, si viene esa variable quiero que la use y si no que use la pagina 0
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Devolver todos los usuarios y ejecutar.. nos muestra usuarios con estado activo
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde) // Saltar de 5 registros y que me muestre 5 reg
        .limit(limite) // Mostar 5 resgistros
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //contamos la cantidad de registros con el mismo parametros {}
            Usuario.count({ estado: true }, (err, conteo) => {


                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })


        })

});

//Obtener informacion "Procesar" y la serializa en un json y se llama bodyparser
app.post('/usuario', function(req, res) {

    let body = req.body;
    // creamos la instacioa de un nuevo usuario con todas las propiedad 
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encryptamos
        role: body.role
    });

    // Gravamos en la base de datos
    /**Le pasamos dos cosas,  puedo revicir un error en caso que suceda o un usuario de db */
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        // Regresemos todo el usuario de la db
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

//Reviviendo parametros por url
//put -->Actualizacion de un registro
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //valores que voy a actualizar con el underscore


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })



});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //Borramos el registro fisicamente
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     };

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // })

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    })


});

module.exports = app;