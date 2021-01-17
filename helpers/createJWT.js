const colors = require( 'colors' );
const jwt = require( 'jsonwebtoken' );

const createJWT = ( uid ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid: uid };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' }, ( err, token ) => {
            if( err ) {
                console.log( colors.magenta( err ) );
                reject( colors.red( 'No se pudo generar el token' ) );
            }

            resolve( token );
        } );
    } );
};

module.exports = {
    createJWT
};
