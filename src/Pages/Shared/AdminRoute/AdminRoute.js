import React from 'react';
import { Route, Redirect } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import useSwal from '../../hooks/useSwal'

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, admin } = useAuth()
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
            render={({ location }) => user.email && admin ? children : <Redirect
                to={{
                    pathname: "/signIn",
                    state: { from: location }
                }}></Redirect>
            }
        ></Route>
    </div>
    );

};

export default AdminRoute;