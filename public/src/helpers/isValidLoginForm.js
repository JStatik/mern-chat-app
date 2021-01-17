import validator from 'validator';

const isValidLoginForm = ( email, password ) => {
    if( !validator.isEmail( email ) || password.length <= 5 ) {
        return {
            msgError: 'Los datos ingresados no son válidos.',
            isValid: false
        };
    } else if( !validator.isAlphanumeric( password ) ) {
        return {
            msgError: 'Los datos ingresados no son válidos.',
            isValid: false
        };
    } else if ( validator.isEmpty( email ) || validator.isEmpty( password ) ) {
        return {
            msgError: 'Los datos ingresados no son válidos.',
            isValid: false
        };
    }

    return { 
        msgError: null, 
        isValid: true 
    };
};

export default isValidLoginForm;
