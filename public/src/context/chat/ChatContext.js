import React, { createContext, useCallback, useReducer, useRef } from 'react';
import { animateScroll } from 'react-scroll';
import chatReducer from '../../reducer/chat/chatReducer';

const ChatContext = createContext();

const initialState = {
    users: [],
    uid: null,
    uidUserTo: null,
    messages: [],
    notifications: [],
    loadingMessages: true
};

const ChatProvider = ( { children } ) => {
    const inputMessage = useRef();
    const activeChat = useRef();
    const scrollTop = useRef( 0 );
    const clientHeight = useRef( 0 );
    const scrollHeight = useRef( 0 );
    const containerMessages = useRef();
    const [ chatState, dispatch ] = useReducer( chatReducer, initialState );

    const scrollToBotton = useCallback( () => {
        animateScroll.scrollToBottom( {
            containerId: containerMessages.current?.id,
            duration: 0
        } );
    }, [] );

    const scrollTo = useCallback( () => {
        if( scrollTop.current === ( scrollHeight.current - clientHeight.current ) ) {
            scrollToBotton();
        } else {
            animateScroll.scrollTo(
                scrollTop.current,
                {
                    containerId: containerMessages.current?.id,
                    duration: 0
                }
            );
        }
    }, [ scrollToBotton ] );

    return (
        <ChatContext.Provider value={ {
            chatState,
            dispatch,
            scrollTop,
            clientHeight,
            scrollHeight,
            inputMessage,
            containerMessages,
            activeChat,
            scrollToBotton,
            scrollTo
        } }>
            { children }
        </ChatContext.Provider>
    );
};

export {
    ChatContext,
    ChatProvider
};
