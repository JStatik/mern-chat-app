const colors = require( 'colors' );
const Message = require( '../../models/message' );

class ChatControl {
    saveMessages = async( message ) => {
        try {
            const newMessage = new Message( message );
            await newMessage.save();

            return {
                newMessage: newMessage
            };
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    };
};

module.exports = {
    ChatControl
};
