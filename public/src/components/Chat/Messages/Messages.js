import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ChatContext } from '../../../context/chat/ChatContext';
import LoadingMessages from './LoadingMessages';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import ScrollButton from './ScrollButton';
import SendMessage from './SendMessage';

const Messages = () => {
    const { auth } = useContext( AuthContext );
    const { chatState, scrollTop, clientHeight, scrollHeight, containerMessages } = useContext( ChatContext );

    const { uid } = auth;
    const { loadingMessages, messages } = chatState;

    const [ scrollTopState, setScrollTopState ] = useState( scrollTop.current );
    const [ clientHeightState, setClientHeightState ] = useState( clientHeight.current );
    const [ scrollHeightState, setScrollHeightState ] = useState( scrollHeight.current );

    const handleScroll = ( event ) => {
        setScrollTopState( event.target.scrollTop );
        setClientHeightState( event.target.clientHeight );
        setScrollHeightState( event.target.scrollHeight );

        scrollTop.current = event.target.scrollTop;
        clientHeight.current = event.target.clientHeight;
        scrollHeight.current = event.target.scrollHeight;
    };

    return (
        <div className="messages">
            <div id="containerMessages" className="msg_history" ref={ containerMessages } onScroll={ handleScroll }>
                {   
                    loadingMessages
                        ?
                            <LoadingMessages />
                        :
                            messages.map( message => (
                                ( message.from === uid )
                                    ? <OutgoingMessage key={ message._id } message={ message } />
                                    : <IncomingMessage key={ message._id } message={ message } />
                            ) )
                }

                { scrollTopState !== ( scrollHeightState - clientHeightState ) && <ScrollButton /> }
            </div>

           <SendMessage />
        </div>
    );
};

export default Messages;
