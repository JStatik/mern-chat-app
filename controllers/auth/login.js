const colors = require( 'colors' );
const bcrypt = require( 'bcryptjs' );
const { response } = require( 'express' );
const User = require( '../../models/user' );
const { createJWT } = require( '../../helpers/createJWT' );

const login = async( req, res = response ) => {
    const { email: emailReq, password: passwordReq } = req.body;

    try {
        const user = await User.findOne( { email: emailReq } );

        if( !user ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'Los datos ingresados no son válidos.'
                }
            );
        }

        const validPassword = bcrypt.compareSync( passwordReq, user.password );

        if( !validPassword ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'Los datos ingresados no son válidos.'
                }
            );
        }

        const token = await createJWT( user._id );

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
    login
};
