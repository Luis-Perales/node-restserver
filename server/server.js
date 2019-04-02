require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

//Obtener informacion "Procesar" y la serializa en un json y se llama bodyparser
app.post('/usuario', function(req, res) {

    let body = req.body;
    //Si no me envian un nombre, envio un estatus para decirle que hace falta
    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }


});

//Reviviendo parametros por url
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete usurios');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});