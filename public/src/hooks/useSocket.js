import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = ( serverPath ) => {
    const [ socket, setSocket ] = useState( null );
    const [ online, setOnline ] = useState( false );

    const connectSocket = useCallback( () => {
        const user = JSON.parse( localStorage.getItem( 'ucha' ) );

        setSocket(
            io.connect(
                serverPath,
                {
                    transports: [ 'websocket' ],
                    autoConnect: true,
                    forceNew: true,
                    query: {
                        'x-token': user.token || null
                    }
                }
            )
        );
    }, [ serverPath ] );

    const disconnectSocket = useCallback( () => {
        socket?.disconnect();
    }, [ socket ] );

    useEffect( () => {
        socket?.on( 'connect', () => {
            setOnline( true );
        } );

        socket?.on( 'disconnect', () => {
            setOnline( false );
        } );
    }, [ socket ] );

    return { socket, online, connectSocket, disconnectSocket };
};

export default useSocket;
