import React, {Component} from 'react'

import utils from '../../utils'
import styles from './TaskComponent.scss';



class TaskComponent extends Component{
    constructor(props){
        super(props);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);

        this.state = {
            hide_btns: true
        }
    }

    handleOnClick(){
        this.setState(
            {
                hide_btns: this.state.hide_btns?true:false
            }
        );
    }

    handleOnMouseOver(){
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
            <li className={"d-flex " + styles.task } onClick={utils.isMobile() ? this.handleOnClick : undefined} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"flex-grow-1 " + styles.desc}>
                {!utils.isMobile()?this.props.task.desc:this.props.task.desc.substring(0,10)}
                {utils.isMobile() && this.props.task.desc.length>10 && "..."}
                    {this.props.task.project!=null &&
                    <span style={{color: this.props.task.project.color}} className={styles.label}><i className="fas fa-circle"></i> {this.props.task.project.name}</span>
                    }
                </div>                
                {!utils.isMobile() && <div className={styles.dates}>{utils.getHour(this.props.task.date_start)} - {utils.getHour(this.props.task.date_end)}</div>}                
                <div className={styles.dates}>{utils.diffHoursBetDates(this.props.task.date_start, this.props.task.date_end)}</div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i className="fas fa-play"></i></button></div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i className="fas fa-ellipsis-v"></i></button></div>
            </li>
        )
    }
}

export default TaskComponent;