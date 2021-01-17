import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../../context/auth/AuthContext';
import { ChatContext } from '../../../../context/chat/ChatContext';
import { SocketContext } from '../../../../context/sockets/SocketContext';
import fetchToken from '../../../../helpers/fetchToken';
import popUp from '../../../../helpers/popUp';
import types from '../../../../types/types';

const SidebarChatItem = ( { uid, name, img, online, notification } ) => {
    const { socket } = useContext( SocketContext );
    const { auth, logout } = useContext( AuthContext );
    const { chatState, dispatch, scrollTop, clientHeight, scrollHeight, inputMessage, activeChat, scrollToBotton } = useContext( ChatContext );

    const { uidUserTo } = chatState;
    const { uid: uidNotificationTo } = auth;

    const handleClick = async() => {
        socket.emit( 'resetNotification', { from: uid, to: uidNotificationTo, notification: 0 } );

        dispatch( {
            type: types.activeChat,
            payload: uid
        } );

        activeChat.current = uid;

        if( uidUserTo !== uid ) {
            dispatch( { type: types.loadingMessages } );

            const user = JSON.parse( localStorage.getItem( 'ucha' ) ) || null;

            if( !user ) return logout();
            if( !user.token ) return logout();

            if( uidUserTo ) {
                inputMessage.current.value = '';
                scrollTop.current = 0;
                clientHeight.current = 0;
                scrollHeight.current = 0;
            };

            const res = await fetchToken( `/messages/${ uid }`, user.token );

            if( !res.ok ) return popUp( 'error', '#990000', 'Error...', 'No se pudo obtener la conversación con el usuario. Intente nuevamente.' );

            dispatch( {
                type: types.getMessages,
                payload: res.messages.reverse()
            } );

            scrollToBotton();
        }
    };

    return (
        <div className={ `chat_list ${ uidUserTo === uid && 'active-chat' }` } onClick={ handleClick }>
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src={ `./assets/users/${ img }` } alt="user"/>
                </div>

                <div className="chat_ib">
                    <h5>{ name } { notification > 0 && <span className="notification">{ notification }</span> }</h5>
                    {
                        online ? <span className="text-success">Online</span> : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    );
};

SidebarChatItem.propTypes = {
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    notification: PropTypes.number.isRequired
};

export default SidebarChatItem;
