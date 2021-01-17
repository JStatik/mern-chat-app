import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/auth/AuthContext';
import { ChatContext } from '../../../../context/chat/ChatContext';
import SidebarChatItem from './SidebarChatItem';

const Sidebar = () => {
    const { auth } = useContext( AuthContext );
    const { chatState } = useContext( ChatContext );
    const { users, notifications } = chatState;

    const usersWithNotification = users.map( user => {
        const notification = notifications.filter( notification => notification.from === user.uid );
        user.notification = notification[ 0 ]?.notification || 0;

        return user;
    } );

    const usersFilter = usersWithNotification.filter( user => user.uid !== auth.uid );

    return (
        <div className="inbox_chat">
            {
                usersFilter.map( user => (
                    <SidebarChatItem
                        key={ user.uid }
                        uid={ user.uid }
                        name={ user.name }
                        img={ user.img }
                        online={ user.online }
                        notification={ user.notification }
                    />
                ) )
            }

            <div className="extra_space"></div>
        </div>
    );
};

export default Sidebar;
