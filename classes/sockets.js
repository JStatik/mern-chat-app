const colors = require( 'colors' );
const validator = require( 'validator' );
const { verifyJWTSockets } = require( '../helpers/verifyJWTSockets' );
const { isValidMessage } = require( '../helpers/isValidMessage' );
const { UserControl } = require( './User/userControl' );
const { ChatControl } = require( './Chat/chatControl' );
const { NotificationControl } = require( './Notification/notificationControl' );

const users = new UserControl();
const messages = new ChatControl();
const notifications = new NotificationControl();

class Sockets {
    constructor( io ) {
        this.io = io;
        this.eventsSockets();
    }

    eventsSockets = () => {
        this.io.on( 'connection', async( client ) => {
            const [ isValid, uid ] = verifyJWTSockets( client.handshake.query[ 'x-token' ] );

            if( !isValid ) {
                client.emit( 'disconnectClient', null );
                return client.disconnect();
            }

            const { user } = await users.updateOnlineUser( uid, true );
            console.log( colors.yellow( `Dispositivo conectado: ${ user.name }` ) );



            client.join( uid );

            
        
            this.io.emit( 'users', await users.getUsers() );
            client.emit( 'notifications', await notifications.getNotifications( uid ) );



            client.on( 'disconnect', async() => {
                const { user } = await users.updateOnlineUser( uid, false );
                console.log( colors.red( `Dispositivo desconectado: ${ user.name }` ) );

                await users.updateActiveChatUser( uid, '' );

                this.io.emit( 'users', await users.getUsers() );
            } );



            client.on( 'newMessage', async( data, callback ) => {
                if( !callback ) return;

                if( !data.from || !data.to || !data.message || !data.imgUserFrom ) return callback( { err: 'Ingrese un mensaje válido.' } );
 
                const from = validator.escape( data.from );
                const to = validator.escape( data.to );
                const message = validator.escape( data.message );
                const imgUserFrom = validator.escape( data.imgUserFrom );

                const { msgError, isValid } = isValidMessage( from, to, message, imgUserFrom );
                if( !isValid ) return callback( { err: msgError } );

                const { newMessage } = await messages.saveMessages( { from, to, message, imgUserFrom } );
                this.io.to( to ).emit( 'newMessage', newMessage );
                return callback( newMessage );
            } );



            client.on( 'resetNotification', async( data ) => {
                const from = validator.escape( data.from );
                const to = validator.escape( data.to );
                const { notification } = data;

                const { activeChat } = await users.getActiveChatUser( uid );

                if( activeChat !== from ) {
                    await users.updateActiveChatUser( uid, from );

                    await notifications.updateNotification( from, to, notification );
                    this.io.to( to ).emit( 'notifications', await notifications.getNotifications( to ) );
                }
            } );



            client.on( 'newNotification', async( data ) => {
                if( !data.from || !data.to || !data.notification ) return;

                if( data.from.trim().length !== 24 || data.to.trim().length !== 24 || isNaN( data.notification ) ) return;

                const from = validator.escape( data.from );
                const to = validator.escape( data.to );
                const { notification } = data;

                const { activeChat: activeChatUserTo } = await users.getActiveChatUser( to );

                if( activeChatUserTo === from ) return;

                await notifications.updateNotification( from, to, notification );
                this.io.to( to ).emit( 'notifications', await notifications.getNotifications( to ) );
            } );
        } );
    }
}

module.exports = Sockets;
