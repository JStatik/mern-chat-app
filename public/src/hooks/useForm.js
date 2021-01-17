import { useState } from 'react';

const useForm = ( initialState = {} ) => {
    const [ formValues, setFormValues ] = useState( initialState );

    const handleInputChange = ( event ) => {
        setFormValues( { ...formValues, [ event.target.name ]: event.target.value } );
    };

    const toggleCheck = ( check ) => {
        setFormValues( { ...formValues, rememberme: !check } );
    };

    const reset = ( newState = initialState ) => {
        setFormValues( newState );
    };

    return [ formValues, handleInputChange, toggleCheck, reset ];
};

export default useForm;
