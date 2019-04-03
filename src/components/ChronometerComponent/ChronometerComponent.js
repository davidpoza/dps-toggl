import React, {Component} from 'react'
import PropTypes from 'prop-types';


import styles from './ChronometerComponent.scss';
import utils from '../../utils';



class ChronometerComponent extends Component{
    constructor(props){
        super(props);      
    }

    render(){
        return(
            <div id="counter" className={styles.counter}>{utils.secondsToFormatedString(this.props.time)}</div>
        )
    }
}

ChronometerComponent.propTypes = {
    time: PropTypes.number.isRequired
}

export default ChronometerComponent;