import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';

const IncomingMessage = React.memo( ( { message: messageDB } ) => {
    const { message, imgUserFrom, createdAt } = messageDB;
    const fecha = moment( createdAt );
    
    const hora = fecha.format( 'LT' );
    const mes = fecha.format( 'MMMM' );
    const dia = fecha.format( 'DD' );

    return (
        <>
            <div className="incoming_msg_img">
                <img src={ `./assets/users/${ imgUserFrom }` } alt="User"/>
            </div>

            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ message }</p>
                    <span className="time_date"> { hora } | { `${ mes } ${ dia }` }</span>
                </div>
            </div>
        </>
    );
} );

IncomingMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default IncomingMessage;
