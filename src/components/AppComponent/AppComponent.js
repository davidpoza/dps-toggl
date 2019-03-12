import React, {Component} from 'react'
import icon from '../../images/icon.png';
import styles from './AppComponent.scss';
import ChildComponent from '../ChildComponent/ChildComponent';

class AppComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.clase}>Funciona!
                <ChildComponent />
                <img src={icon} />
            </div>
        )
    }
}

export default AppComponent;