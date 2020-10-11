const jwt = require('jsonwebtoken');
const moment = require('moment'); //NOS AYUDA CON LAS FECHAS

const token = {

    signToken: (usuario) => {
        const payload = {
            usuario,
            iat: moment().unix(), //CUANDO FUE CREADO EL TOKEN
            exp: moment().add(1440, 'minute').unix() //CUANDO VA EXPIRAR EL TOKEN
            //MOMENT AÑADE TANTO TIEMPO AL TIEMPO UNIX QUE SE CREO ARRIBA
        }
        return jwt.sign(payload, process.env.TOKEN_SECRET);
    },
    verificarToken: (req, res, next) => {
        const token = req.header('Authetication');
        try {
            if (!token) return res.status(401).send({ status: 'Error', message: 'Token no existente', code: 401 })

            const payload = jwt.verify(token, process.env.TOKEN_SECRET);
            req.payload = payload;
            next();
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).send({ status: 'Error', message: 'Token expirado', code: 401 });
            }
            return res.status(400).send({ status: 'Error', message: 'Token incorrecto', code: 400 });
        }
    }
};

module.exports = token;