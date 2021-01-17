import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';

const PanelBox = () => {
    const { auth, logout } = useContext( AuthContext );

    const handleClick = () => {
        logout();
    };

    return (
        <div className="row headind_srch">
            <div className="col-sm-11 offset-sm-1 col-md-11 col-lg-7 col-xl-7 col-xxl-7 mt-2">
                <h4>{ auth.name }</h4>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 text-center">
                <button className="btn btn-outline-danger" onClick={ handleClick }>Salir</button>
            </div>
        </div>
    );
};

export default PanelBox;
