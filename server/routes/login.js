const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();


app.post('/login', (req, res) => {

    let body = req.body; // Obtenemos el correo y el pass

    //  Checamos que el email exista
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        // Sí viene un error del servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //  Si no hay un usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        // Evaluamos la contraseña, comparamos la contraseña ya encryptada aver si considen
        //bcrypt.compareSync() retorna un true si existen si no un false
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        // Generamos el token
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        // Si paso todas esas válidaciones, entonces el usuario y el pass son correctos
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    })

});










module.exports = app;