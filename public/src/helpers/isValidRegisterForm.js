import validator from 'validator';

const isValidRegisterForm = ( name, email, password ) => {
    if( name.trim().length === 0 || name.trim().length < 2 || validator.isEmpty( name ) ) {
        return {
            msgErrorName: 'Ingrese un nombre válido.',
            msgErrorEmail: null,
            msgErrorPassword: null,
            isValid: false
        };
    } else if( !validator.isEmail( email ) || validator.isEmpty( email ) ) {
        return {
            msgErrorName: null,
            msgErrorEmail: 'El email no es válido.',
            msgErrorPassword: null,
            isValid: false
        };
    } else if( password.length <= 5 || validator.isEmpty( password ) ) {
        return {
            msgErrorName: null,
            msgErrorEmail: null,
            msgErrorPassword: 'La contraseña debe tener al menos 6 caracteres.',
            isValid: false
        };
    } else if( !validator.isAlphanumeric( password ) ) {
        return {
            msgErrorName: null,
            msgErrorEmail: null,
            msgErrorPassword: 'La contraseña no debe tener caracteres especiales.',
            isValid: false
        };
    }

    return { 
        msgErrorName: null,
        msgErrorEmail: null,
        msgErrorPassword: null,
        isValid: true 
    };
};

export default isValidRegisterForm;
