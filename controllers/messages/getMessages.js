const colors = require( 'colors' );
const { response } = require( 'express' );
const Message = require( '../../models/message' );

const getMessages = async( req, res = response ) => {
    const { uid: myId } = req;
    const { id: idOtherUser } = req.params;

    encodeURI( idOtherUser );

    if( idOtherUser.length !== 24 ) {
        return res.status( 400 ).json(
            {
                ok: false,
                msg: 'El ID del otro usuario es incorrecto'
            }
        );
    }

    try {
        const messages = await Message
            .find( {
                $or: [ 
                    { from: myId, to: idOtherUser },
                    { to: myId, from: idOtherUser }
                ]
            } )
            .sort( { createdAt: 'desc' } )
            .limit( 50 )
            .exec();

        return res.status( 200 ).json( {
            ok: true,
            messages: messages
        } );
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
    getMessages
};
