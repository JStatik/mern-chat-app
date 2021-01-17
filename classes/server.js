const colors = require( 'colors' );
const path = require( 'path' );
const cors = require( 'cors' );
const express = require( 'express' );
const http = require( 'http' );
const socketIO = require( 'socket.io' );
const Sockets = require( './sockets' );
const { dbConnection } = require( '../database/config' );

class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer( this.app );
        this.io = socketIO( this.server );

        /************************************************************************ BASE DE DATOS ************************************************************************/
        dbConnection();
    }

    middlewares = () => {
        /***************************************************************************** CORS *****************************************************************************/
        this.app.use( cors() );

        /********************************************************************** DIRECTORIO PUBLICO **********************************************************************/
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        /****************************************************************** LECTURA Y PARSEO DEL BODY ******************************************************************/
        this.app.use( express.json() );

        /************************************************************************** ENDPOINTS **************************************************************************/
        this.app.use( '/api/auth', require( '../routers/auth' ) );
        this.app.use( '/api/messages', require( '../routers/messages' ) );
        this.app.get( '*', ( req, res ) => {
            res.sendFile( path.join( __dirname, '../public/index.html' ) );
        } );
    }

    socketsConfig = () => {
        /************************************************************************** SOCKET IO **************************************************************************/
        new Sockets( this.io );
    }

    execute = () => {
        this.middlewares();
        this.socketsConfig();

        /**************************************************************************** SERVER ****************************************************************************/
        this.server.listen( process.env.PORT, () => {
            console.log( colors.yellow( `Servidor corriendo en puerto: ${ process.env.PORT }` ) );
        } );
    }
}

module.exports = Server;
