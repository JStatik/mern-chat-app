import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import useForm from '../hooks/useForm';
import isValidRegisterForm from '../helpers/isValidRegisterForm';

const Register = () => {
    const { register } = useContext( AuthContext );

    const [ formValues, handleInputChange, , reset ] = useForm( { name: '', email: '', password: '' } );
    const { name, email, password } = formValues;

    const [ disabled, setDisabled ] = useState( false );
    const [ msgErrorRegister, setMsgErrorRegister ] = useState( null ); 
    const [ msgErrorNameRegister, setMsgErrorNameRegister ] = useState( null );
    const [ msgErrorEmailRegister, setMsgErrorEmailRegister ] = useState( null );
    const [ msgErrorPasswordRegister, setMsgErrorPasswordRegister ] = useState( null );

    const handleSubmit = async( event ) => {
        event.preventDefault();
        setDisabled( true );
        setMsgErrorRegister( null );

        const { msgErrorName, msgErrorEmail, msgErrorPassword, isValid } = isValidRegisterForm( name, email, password );
        setMsgErrorNameRegister( msgErrorName );
        setMsgErrorEmailRegister( msgErrorEmail );
        setMsgErrorPasswordRegister( msgErrorPassword );

        if( isValid ) {
            register( name, email, password )
                .then( msgError => {
                    if( msgError ) {
                        setMsgErrorRegister( msgError );
                        setDisabled( false );
                        return;
                    }
                } );

            reset();
        }

        setDisabled( false );
    };

    return (
        <form className="login100-form" autoComplete="off" onSubmit={ handleSubmit }>
            <span className="login100-form-title mb-3">Chat</span>

            { msgErrorRegister && <div className="alert-error">{ msgErrorRegister }</div> }
            { msgErrorNameRegister && <div className="alert-error">{ msgErrorNameRegister }</div> }
            { msgErrorEmailRegister && <div className="alert-error">{ msgErrorEmailRegister }</div> }
            { msgErrorPasswordRegister && <div className="alert-error">{ msgErrorPasswordRegister }</div> }

            <div className="wrap-input100 mb-1">
                <input className="input100" type="text" name="name" placeholder="Name" value={ name } onChange={ handleInputChange }/>
                <span className="focus-input100"></span>
            </div>
       
            <div className="wrap-input100 mb-1">
                <input className="input100" type="text" name="email" placeholder="Email" value={ email } onChange={ handleInputChange }/>
                <span className="focus-input100"></span>
            </div>
                 
            <div className="wrap-input100 mb-3">
                <input className="input100" type="password" name="password" placeholder="Password" value={ password } onChange={ handleInputChange }/>
                <span className="focus-input100"></span>
            </div>
            
            <div className="container-login100-form-btn mb-1">
                <button type="submit" className="login100-form-btn" disabled={ disabled }>Register</button>
            </div>

            <div className="row">
                <div className="col text-center">
                    <Link to="/auth/login" className="txt1">Ingresar</Link>
                </div>
            </div>
        </form>
    );
};

export default Register;
