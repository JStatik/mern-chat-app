import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import useForm from '../hooks/useForm';
import getRememberEmail from '../helpers/getRememberEmail';
import isValidLoginForm from '../helpers/isValidLoginForm';

const Login = () => {
    const { login } = useContext( AuthContext );

    const [ formValues, handleInputChange, toggleCheck, reset ] = useForm( { email: getRememberEmail(), password: '', rememberme: true } );
    const { email, password, rememberme } = formValues;

    const [ disabled, setDisabled ] = useState( false );
    const [ msgErrorLogin, setMsgErrorLogin ] = useState( null );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        setDisabled( true );

        const { msgError, isValid } = isValidLoginForm( email, password );
        setMsgErrorLogin( msgError );

        if( isValid ) {
            login( email, password, rememberme )
                .then( msgError => {
                    if( msgError ) setMsgErrorLogin( msgError );
                } );    
        }

        setDisabled( false );
        reset();
    };

    return (
        <form className="login100-form" autoComplete="off" onSubmit={ handleSubmit }>
            <span className="login100-form-title mb-3">Chat</span>

            { msgErrorLogin && <div className="alert-error">{ msgErrorLogin }</div> }
            
            <div className="wrap-input100 mb-1">
                <input className="input100" type="text" name="email" placeholder="Email" value={ email } onChange={ handleInputChange }/>
                <span className="focus-input100"></span>
            </div>
                    
            <div className="wrap-input100 mb-3">
                <input className="input100" type="password" name="password" placeholder="Password" value={ password } onChange={ handleInputChange }/>
                <span className="focus-input100"></span>
            </div>
            
            <div className="container-login100-form-btn mb-1">
                <button type="submit" className="login100-form-btn" disabled={ disabled }>Login</button>
            </div>

            <div className="row">
                <div className="col-6 text-center" onClick={ () => toggleCheck( rememberme ) }>
                    <input className="input-checkbox100" type="checkbox" name="rememberme" checked={ rememberme } readOnly/>
                    <label className="label-checkbox100">Recordarme</label>
                </div>

                <div className="col-6 text-center">
                    <Link to="/auth/register" className="txt1">Registro</Link>
                </div>
            </div>
        </form>
    );
};

export default Login;
