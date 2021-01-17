import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';

const OutgoingMessage = React.memo( ( { message: messageDB } ) => {
    const { message, createdAt } = messageDB;
    const fecha = moment( createdAt );
    
    const hora = fecha.format( 'LT' );
    const mes = fecha.format( 'MMMM' );
    const dia = fecha.format( 'DD' );

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ message }</p>
                <span className="time_date"> { hora } | { `${ mes } ${ dia }` }</span>
            </div>
        </div>
    );
} );

OutgoingMessage.propTypes = {
    message: PropTypes.object.isRequired
};

export default OutgoingMessage;
