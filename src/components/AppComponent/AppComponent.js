import React, {Component} from 'react'
import icon from '../../images/icon.png';

import styles from './AppComponent.scss';
import MenuComponent from '../MenuComponent/MenuComponent';


class AppComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={"container-flex " + styles.containerflex}>
                <div className={"row " + styles.row}>
                    <div className={"col-auto col-md-3 " + styles.menu}>
                        <MenuComponent />
                    </div>
                    <div className={"col col-md-9 " + styles.content}>
                       <button className="btn btn-primary" >Prueba</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default AppComponent;