import React, {Component} from 'react'
import { connect } from 'react-redux';

import TimerDashboardComponent from './TimerDashboardComponent';





class TimerDashboardContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <TimerDashboardComponent user={this.props.user} actions={this.props.actions}/>
        )
    }
}

  
export default connect()(TimerDashboardContainer);
