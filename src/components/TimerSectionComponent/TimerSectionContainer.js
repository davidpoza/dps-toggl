import React, {Component} from 'react'
import { connect } from 'react-redux';

import TimerSectionComponent from './TimerSectionComponent';





class TimerSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <TimerSectionComponent user={this.props.user} user={this.props.user} task={this.props.task} project={this.props.project} tag={this.props.tag}/>
        )
    }
}

  
export default connect()(TimerSectionContainer);
