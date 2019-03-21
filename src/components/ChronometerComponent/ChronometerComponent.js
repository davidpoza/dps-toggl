import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './ChronometerComponent.scss';



class ChronometerComponent extends Component{
    constructor(props){
        super(props);

        this.format = this.format.bind(this);
      
    }

    format(time){
        let aux = time;
        let hours = parseInt(time / 3600);
        aux = time % 3600;       
        let min = parseInt(aux / 60);
        let sec = aux % 60;

        if (hours.toString().length < 2)  hours="0"+hours;
        if (min.toString().length < 2)  min="0"+min;
        if (sec.toString().length < 2)  sec="0"+sec;

        return `${hours}:${min}:${sec}`;
    }

    



    render(){
        return(
            <div id="counter" className={styles.counter}>{this.format(this.props.time)}</div>
        )
    }
}

export default ChronometerComponent;