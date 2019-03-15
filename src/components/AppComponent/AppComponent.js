import React, {Component} from 'react'

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
                    <div className={"col-auto  " + styles.menu}>
                        <MenuComponent />
                    </div>
                    <div className={"col   " + styles.content}>
                       <button className="btn btn-primary" >Prueba</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default AppComponent;