const jwt = require('jsonwebtoken');

// =============================
//  Verificar Token
// =============================

let verificaToken = (req, res, next) => {

    //  Leer headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        // decoded es mi payload y yo se que hay dentro esta mi usuario
        req.usuario = decoded.usuario;
        next();


    });

};


// =============================
//  Verifica AdminRole
// =============================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


};



module.exports = {
    verificaToken,
    verificaAdmin_Role
}