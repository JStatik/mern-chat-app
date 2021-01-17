import React, { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../chat/ChatContext';
import useSocket from '../../hooks/useSocket';
import types from '../../types/types';

const SocketContext = createContext();

const SocketProvider = ( { children } ) => {
    const { auth } = useContext( AuthContext );
    const { activeChat, dispatch, scrollTo } = useContext( ChatContext );
    const { socket, online, connectSocket, disconnectSocket } = useSocket( process.env.REACT_APP_SERVER_SOCKETS );

    const { logged } = auth;

    useEffect( () => {
        if( logged ) {
            connectSocket();
        }
    }, [ logged, connectSocket ] );

    useEffect( () => {
        if( !logged ) {
            disconnectSocket();
        }
    }, [ logged, disconnectSocket ] );

    useEffect( () => {
        socket?.on( 'users', ( { users } ) => {
            dispatch( {
                type: types.getUsers,
                payload: users
            } );

            scrollTo();
        } );
    }, [ socket, dispatch, scrollTo ] );

    useEffect( () => {
        socket?.on( 'notifications', ( { notifications } ) => {
            dispatch( {
                type: types.getNotifications,
                payload: notifications
            } );

            scrollTo();
        } );
    }, [ socket, dispatch, scrollTo ] );

    useEffect( () => {
        socket?.on( 'newMessage', ( newMessage ) => { 
            if( activeChat.current === newMessage.from ) {
                const audio = new Audio( '../assets/audio/new-message.mp3' );
                audio.play();

                dispatch( {
                    type: types.addMessage,
                    payload: newMessage
                } );
            }

            scrollTo();
        } );
    }, [ socket, dispatch, scrollTo, activeChat ] );

    return (
        <SocketContext.Provider value={ { socket, online } }>
            { children }
        </SocketContext.Provider>
    );
};

export {
    SocketContext, 
    SocketProvider 
};
