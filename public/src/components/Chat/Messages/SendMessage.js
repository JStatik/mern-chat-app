import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ChatContext } from '../../../context/chat/ChatContext';
import { SocketContext } from '../../../context/sockets/SocketContext';
import useForm from '../../../hooks/useForm';
import isValidMessageForm from '../../../helpers/isValidMessageForm';
import popUp from '../../../helpers/popUp';
import types from '../../../types/types';

const SendMessage = React.memo( () => {
    const { auth } = useContext( AuthContext );
    const { socket } = useContext( SocketContext );
    const { chatState, dispatch, inputMessage, scrollToBotton } = useContext( ChatContext );

    const { uid, img } = auth;
    const { uidUserTo } = chatState;

    const [ formValues, handleInputChange, , reset ] = useForm( { message: inputMessage.current?.value } );
    const { message } = formValues;

    const handleSubmit = ( event ) => {
        event.preventDefault();

        const { msgError, isValid } = isValidMessageForm( message );

        if( isValid ) {
            socket.emit( 'newNotification', { from: uid, to: uidUserTo, notification: 1 } );

            socket.emit( 'newMessage', { from: uid, to: uidUserTo, message: message, imgUserFrom: img }, ( res ) => {
                if( res.err ) return popUp( 'error', '#990000', 'Error...', res.err );

                dispatch( {
                    type: types.addMessage,
                    payload: res
                } );

                scrollToBotton();
            } );
        } else {
            popUp( 'error', '#990000', 'Error...', msgError );
        }

        reset( { message: '' } );
    };

    return (
        <form className="row form-send-message" autoComplete="off" onSubmit={ handleSubmit }>
            <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10 input_msg_write">
                <input
                    type="text"
                    className="write_msg"
                    placeholder="Mensaje..."
                    name="message"
                    value={ message }
                    autoFocus={ true }
                    ref={ inputMessage }
                    onChange={ handleInputChange }
                />
            </div>

            <div className="d-none d-lg-inline d-xxl-none col-2 text-center">
                <button className="btn btn-success msg_send_btn" type="submit">Enviar</button>
            </div>
        </form>
    );
} );

export default SendMessage;
