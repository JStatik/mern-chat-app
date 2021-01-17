import validator from 'validator';

const isValidMessageForm = ( message ) => {
    if( message.trim().length === 0 || message.trim().length < 2 || validator.isEmpty( message ) ) {
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

export default isValidMessageForm;
