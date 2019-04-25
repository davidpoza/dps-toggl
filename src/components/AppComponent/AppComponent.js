import React, {Component} from 'react'

import styles from './AppComponent.scss';
import MenuComponent from '../MenuComponent/MenuComponent';
import MainSectionContainer from '../MainSectionComponent/MainSectionContainer';

class AppComponent extends Component{
    constructor(props){
        super(props);
        document.documentElement.setAttribute("data-browser", navigator.userAgent);
    }
    render(){
        return(
            <div className={"container-flex " + styles.containerflex}>
                <div className={"row " + styles.row}>
                    <div className={"col-auto  " + styles.menu}>
                        <MenuComponent />
                    </div>
                    <div className={"col d-flex flex-column p-0 " + styles.content}>
                        <MainSectionContainer />
                    </div>
                </div>

            </div>
        )
    }
}

export default AppComponent;