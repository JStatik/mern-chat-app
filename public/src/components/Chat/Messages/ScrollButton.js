import React, { useContext } from 'react';
import { ChatContext } from '../../../context/chat/ChatContext';

const ScrollButton = React.memo( () => {
    const { scrollToBotton } = useContext( ChatContext );

    const handleClick = () => {
        scrollToBotton();
    };

    return (
        <button className="fab" onClick={ handleClick }><i className="fas fa-angle-double-down"></i></button>
    );
} );

export default ScrollButton;
