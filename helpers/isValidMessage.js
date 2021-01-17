const validator = require( 'validator' );

const isValidMessage = ( from, to, message, imgUserFrom ) => {
    if( from.trim().length !== 24 || to.trim().length !== 24 || validator.isEmpty( from ) || validator.isEmpty( to ) ) {
        return {
            msgError: 'Ingrese un mensaje válido.',
            isValid: false
        };
    } else if( message.trim().length < 2 || validator.isEmpty( message ) || imgUserFrom.trim().length <= 0 || validator.isEmpty( imgUserFrom ) ) {
        return {
            msgError: 'Ingrese un mensaje válido.',
            isValid: false
        };
    } else if( !imgUserFrom.includes( '.jpg' ) ) {
        return {
            msgError: 'Ingrese un mensaje válido.',
            isValid: false
        };
    }

    return { 
        msgError: null, 
        isValid: true 
    };
};

module.exports = {
    isValidMessage
};
