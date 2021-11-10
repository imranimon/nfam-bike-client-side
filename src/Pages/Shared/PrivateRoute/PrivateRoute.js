import React from 'react';
import { Route, Redirect } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import useSwal from '../../../hooks/useSwal';


const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth()
    const { startLoading, stopLoading } = useSwal()
    if (isLoading) {
        return <div>
            {
                startLoading('Reloading Page')
            }
        </div>
    }
    return (<div>
        {
            stopLoading()
        }
        <Route
            {...rest}
            render={({ location }) => user.email ? children : <Redirect
                to={{
                    pathname: "/signIn",
                    state: { from: location }
                }}></Redirect>
            }
        ></Route>
    </div>
    );
};

export default PrivateRoute;