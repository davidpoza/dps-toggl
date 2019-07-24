import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import LoginComponent from "./LoginComponent";


class LoginContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <LoginComponent history={this.props.history} user={this.props.user} userActions={this.props.userActions}/>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.userReducer
    };
}

function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

LoginContainer.propTypes = {
    history: PropTypes.object.isRequired, //se recibe esta prop por llamarse desde el component Route de react-router
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
