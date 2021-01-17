import React from 'react';

const LoadingMessages = React.memo( () => {
    return (
        <div className="d-flex text-success" style={ { alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100%' } }>
            <div className="spinner-border" role="status"></div>
        </div>
    );
} );

export default LoadingMessages;
