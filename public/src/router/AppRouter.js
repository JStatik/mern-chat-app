import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthContext } from '../context/auth/AuthContext';
import { SocketContext } from '../context/sockets/SocketContext';
import Loading from '../pages/Loading';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Chat from '../pages/Chat';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
    const { socket } = useContext( SocketContext );
    const { auth, logout, verifyToken } = useContext( AuthContext );

    const { checking, logged } = auth;

    useEffect( () => {
        verifyToken();
    }, [ verifyToken ] );

    useEffect( () => {
        socket?.on( 'disconnectClient', () => {
            logout();
        } );
    }, [ socket, logout ] );

    if( checking ) {
        return <Loading />
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" component={ Chat } isAuthenticated={ logged } />
                    <PublicRoute path="/auth" component={ AuthRouter } isAuthenticated={ logged } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
