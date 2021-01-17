const colors = require( 'colors' );
const bcrypt = require( 'bcryptjs' );
const { response } = require( 'express' );
const User = require( '../../models/user' );
const { createJWT } = require( '../../helpers/createJWT' );

const register = async( req, res = response ) => {
    const { email: emailReq, password: passwordReq } = req.body;

    try {
        const verifyUser = await User.findOne( { email: emailReq } );

        if( verifyUser ) {
            return res.status( 400 ).json(
                {
                    ok: false,
                    msg: 'El email ingresado ya está en uso.'
                }
            );
        }

        const user = new User( req.body );
        user.img = `${ Math.round( Math.random() * 13 ) + 1 }.jpg`;

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( passwordReq, salt );

        await user.save();

        const token = await createJWT( user._id );

        return res.status( 201 ).json(
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
    register
};
