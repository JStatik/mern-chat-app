const colors = require( 'colors' );
const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const verifyJWT = ( req, res = response, next ) => {
    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status( 401 ).json(
            {
                ok: false,
                msg: 'No existe el token en la petición'
            }
        );
    }

    try {
        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );
        const { uid } = payload;

        req.uid = uid;

        next();
    } catch( err ) {
        console.log( colors.magenta( err ) );

        return res.status( 401 ).json(
            {
                ok: false,
                msg: 'Token no válido'
            }
        );
    }
};

module.exports = {
    verifyJWT
};
