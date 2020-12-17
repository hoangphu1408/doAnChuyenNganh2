import React from "react";
import { Route, Redirect } from 'react-router-dom';
export const Auth = ({path, Component}) => {
    return (
        <Route path={path} render={(routeProps) => {
            if(localStorage.getItem('isLogin')){
                return <Component {...routeProps} />
            }
            alert("Vui long dang nhap");
            return <Redirect to="/login" />
        }} />
    )
}

export const NotAuth =({path, Component}) => {
    return (
        <Route path={path} render={(routeProps) => {
            if(localStorage.getItem('isLogin')){     
                return <Redirect to="/admin" />
            }
            return <Component {...routeProps} />
        }} />
    )
}