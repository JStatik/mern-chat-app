import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import '../css/loginRegister.css';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRouter = () => {
    return (
        <div className="limiter">
		    <div className="container-login100">
			    <div className="wrap-login100 animate__animated animate__fadeIn animate__slow">
                    <Switch>
                        <Route exact path="/auth/login" component={ Login } />
                        <Route exact path="/auth/register" component={ Register } />

                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AppRouter;
