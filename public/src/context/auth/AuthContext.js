import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../chat/ChatContext';
import fetchAuth from '../../helpers/fetchAuth';
import fetchToken from '../../helpers/fetchToken';
import types from '../../types/types';

const AuthContext = createContext();

const initialState = {
    checking: true,
    logged: false,
    uid: null,
    name: null,
    email: null,
    img: null
};

const AuthProvider = ( { children } ) => {
    const { dispatch } = useContext( ChatContext );

    const [ auth, setAuth ] = useState( initialState );

    const login = async( email, password, rememberme ) => {
        const data = await fetchAuth( '/auth', { email, password } );

        if( !data.ok ) return data.msg;

        const { token } = data;
        const { uid: uidDB, name: nameDB, email: emailDB, img: imgDB } = data.user;

        rememberme
            ? localStorage.setItem( 'ucha', JSON.stringify( { email, token } ) )
            : localStorage.setItem( 'ucha', JSON.stringify( { token } ) );

        setAuth( ( auth ) => (
            {
                ...auth,
                checking: false,
                logged: true,
                uid: uidDB,
                name: nameDB,
                email: emailDB,
                img: imgDB
            }
        ) );
    };

    const register = async( name, email, password ) => {
        const data = await fetchAuth( '/auth/register', { name, email, password } );

        if( !data.ok ) return data.msg;

        const { token } = data;
        const { uid: uidDB, name: nameDB, email: emailDB, img: imgDB } = data.user;

        localStorage.setItem( 'ucha', JSON.stringify( { email, token } ) );

        setAuth( ( auth ) => (
            {
                ...auth,
                checking: false,
                logged: true,
                uid: uidDB,
                name: nameDB,
                email: emailDB,
                img: imgDB
            }
        ) );
    };

    const logout = useCallback( () => {
        const user = JSON.parse( localStorage.getItem( 'ucha' ) ) || null;

        user.email
            ? localStorage.setItem( 'ucha', JSON.stringify( { email: user.email } ) )
            : localStorage.removeItem( 'ucha' );

        setAuth( ( auth ) => (
            {
                ...auth,
                checking: false,
                logged: false,
                uid: null,
                name: null,
                email: null,
                img: null
            }
        ) );

        dispatch( { type: types.clearChatState } );
    }, [ dispatch ] );

    const verifyToken = useCallback( async() => {
        const user = JSON.parse( localStorage.getItem( 'ucha' ) ) || null;

        if( !user ) {
            return setAuth( ( auth ) => ( { ...auth, checking: false } ) );
        }
        
        if( !user.token ) {
            return setAuth( ( auth ) => ( { ...auth, checking: false } ) );
        }

        const data = await fetchToken( '/auth/renew', user.token );

        if( !data.ok ) {
            setAuth( ( auth ) => ( { ...auth, checking: false } ) );

            user.email
                ? localStorage.setItem( 'ucha', JSON.stringify( { email: user.email } ) )
                : localStorage.removeItem( 'ucha' );
        } else {
            const { token } = data;
            const { uid: uidDB, name: nameDB, email: emailDB, img: imgDB } = data.user;

            user.email
                ? localStorage.setItem( 'ucha', JSON.stringify( { email: user.email, token } ) )
                : localStorage.setItem( 'ucha', JSON.stringify( { token } ) );

            setAuth( ( auth ) => (
                {
                    ...auth,
                    checking: false,
                    logged: true,
                    uid: uidDB,
                    name: nameDB,
                    email: emailDB,
                    img: imgDB
                }
            ) );
        }
    }, [] );

    return (
        <AuthContext.Provider value={ { auth, login, register, logout, verifyToken } }>
            { children }
        </AuthContext.Provider>
    );
};

export {
    AuthContext,
    AuthProvider
};
