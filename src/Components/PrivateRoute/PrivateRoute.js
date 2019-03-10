import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../Values';
import {connect} from "react-redux";
import {
    Route,
    Redirect,
  } from "react-router-dom";
export const PrivateRoute = ({component: Component, signedIn, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => signedIn === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
}