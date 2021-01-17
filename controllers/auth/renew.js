const colors = require( 'colors' );
const { response } = require( 'express' );
const User = require( '../../models/user' );
const { createJWT } = require( '../../helpers/createJWT' );

const renewJWT = async( req, res = response ) => {
    const { uid } = req;
    const token = await createJWT( uid );

    try {
        const user = await User.findById( uid );
    
        return res.status( 200 ).json(
            {
                ok: true,
                token: token,
                user: user
            }
        );
    } catch( err ) {
        console.log( colors.magenta( err ) );

        return res.status( 500 ).json(
            {
                ok: false,
                msg: 'Por favor, hable con el administrador'
            }
        );
    }
};

module.exports = {
    renewJWT
};
