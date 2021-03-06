import React, {Component} from "react";
import { connect } from "react-redux";

import AppComponent from "./AppComponent";

class AppContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AppComponent
                token = {this.props.token}
                admin = {this.props.admin}
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        token: state.userReducer.token,
        admin: state.userReducer.admin
    };
}


export default connect(mapStateToProps, null)(AppContainer);
