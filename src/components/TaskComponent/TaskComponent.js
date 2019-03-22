import React, {Component} from 'react'

import utils from '../../utils'
import styles from './TaskComponent.scss';



class TaskComponent extends Component{
    constructor(props){
        super(props);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.state = {
            hide_btns: true
        }
    }

    handleOnMouseOver(){
        console.log("over")
        if(this.state.hide_btns)
            this.setState(
                {
                    hide_btns: false
                }
            );
    }

    handleOnMouseOut(){
        if(!this.state.hide_btns)
        this.setState(
            {
                hide_btns: true
            }
        );
    }

    render(){
        return(
            <li className={"d-flex " + styles.task } onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"flex-grow-1 " + styles.desc}>{this.props.task.desc}</div>
                <div className={styles.dates}>{utils.getHour(this.props.task.date_start)} - {utils.getHour(this.props.task.date_end)}</div>
                <div className={styles.dates}>{utils.diffHoursBetDates(this.props.task.date_start, this.props.task.date_end)}</div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i class="fas fa-play"></i></button></div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i class="fas fa-ellipsis-v"></i></button></div>
            </li>
        )
    }
}

export default TaskComponent;