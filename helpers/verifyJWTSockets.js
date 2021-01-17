const colors = require( 'colors' );
const jwt = require( 'jsonwebtoken' );

const verifyJWTSockets = ( token ) => {
    try {
        const payload = jwt.verify( token, process.env.SECRET_JWT_SEED );
        const { uid } = payload;

        return [ true, uid ];
    } catch( err ) {
        console.log( colors.magenta( err ) );

        return [ false, null ];
    }
};

module.exports = {
    verifyJWTSockets
};
