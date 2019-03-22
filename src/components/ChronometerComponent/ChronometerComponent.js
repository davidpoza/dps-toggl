import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './ChronometerComponent.scss';
import utils from '../../utils';



class ChronometerComponent extends Component{
    constructor(props){
        super(props);      
    }

    render(){
        return(
            <div id="counter" className={styles.counter}>{utils.format(this.props.time)}</div>
        )
    }
}

export default ChronometerComponent;