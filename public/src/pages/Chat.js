import React, { useContext } from 'react';
import '../css/chat.css';
import { ChatContext } from '../context/chat/ChatContext';
import InboxPeople from '../components/Chat/InboxPeople/InboxPeople';
import Messages from '../components/Chat/Messages/Messages';
import ChatSelect from '../components/Chat/ChatSelect/ChatSelect';

const Chat = () => {
    const { chatState } = useContext( ChatContext );
    const { uidUserTo } = chatState;

    return (
        <div className="inbox_msg">
            <InboxPeople />

            { uidUserTo ? <Messages /> : <ChatSelect /> }
        </div>
    );
};

export default Chat;
