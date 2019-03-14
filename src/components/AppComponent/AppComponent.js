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
            <div className="container-flex">
                <div className="row">
                    <div className="col-2">
                        <MenuComponent />
                    </div>
                    <div className={"col-10 " + styles.content}>
                       contenido
                    </div>
                </div>

            </div>
        )
    }
}

export default AppComponent;