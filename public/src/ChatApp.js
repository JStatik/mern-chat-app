import React from 'react';
import { AuthProvider } from './context/auth/AuthContext';
import { ChatProvider } from './context/chat/ChatContext';
import { SocketProvider } from './context/sockets/SocketContext';
import AppRouter from './router/AppRouter';

const ChatApp = () => {
    return (
        <ChatProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChatProvider>
    );
};

export default ChatApp;
