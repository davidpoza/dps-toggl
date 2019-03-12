import React, {Component} from 'react'
import styles from './ChildComponent.scss';

class ChildComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.clase}>Hijo</div>
        )
    }
}

export default ChildComponent;