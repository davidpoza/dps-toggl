import React from "react";
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";

//destructuring con cambio de nombre de las props, porque los nombres de componentes tienen que comenzar por mayuscula
//y los parametros se pasan en minusculas por convención
const PrivateRoute = ({ component: Component, redux_auth: auth, component_props, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth === true ? (
                <Component {...props} {...component_props}/>
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);


function mapStateToProps (state) {
    return {
        redux_auth: state.userReducer.token != null
    };
}


export default connect(mapStateToProps)(PrivateRoute);
