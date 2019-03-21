import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


function mapStateToProps (state) {
    return {
      auth: state.userReducer.token != null
    }
  }
  
  
  export default connect(mapStateToProps)(PrivateRoute);
