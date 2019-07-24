import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import UserSectionComponent from "./UserSectionComponent";


class UserSectionContainer extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <UserSectionComponent
                user={this.props.user}
                user_loading={this.props.user_loading}
                need_refreshing={this.props.need_refreshing}
                users={this.props.users}
                history={this.props.history}
                userActions={this.props.userActions}
                order={this.props.order}
                sortBy={this.props.sortBy}
            />
        );
    }
}

function sortBy(field="email", order="asc"){
    if (field=="email")
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.email.localeCompare(b.email));
                else if(order == "desc")
                    return(b.email.localeCompare(a.email));
            });
    else if (field=="first_name")
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.first_name.localeCompare(b.first_name));
                else if(order == "desc")
                    return(b.first_name.localeCompare(a.first_name));
            });
    else if (field=="last_name")
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.last_name.localeCompare(b.last_name));
                else if(order == "desc")
                    return(b.last_name.localeCompare(a.last_name));
            });
    else if (field=="created_on") //el formato estándar yyyy-mm-dd se ordena alfabéticamente
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.created_on.localeCompare(b.created_on));
                else if(order == "desc")
                    return(b.created_on.localeCompare(a.created_on));
            });
}

function mapStateToProps (state) {
    let users = state.userReducer.users_id.map(p=>state.userReducer.users_entities[p])
        .sort(sortBy(state.userReducer.sortBy, state.userReducer.order));

    return {
        user: state.userReducer,
        need_refreshing: state.userReducer.need_refreshing,
        user_loading: state.userReducer.loading,
        users: users,
        order: state.userReducer.order,
        sortBy: state.userReducer.sortBy
    };
}

function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSectionContainer);
