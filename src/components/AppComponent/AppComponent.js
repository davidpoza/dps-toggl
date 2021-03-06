import React, {Component} from "react";

import styles from "./AppComponent.scss";
import MenuComponent from "../MenuComponent/MenuComponent";
import MainSectionContainer from "../MainSectionComponent/MainSectionContainer";

class AppComponent extends Component{
    constructor(props){
        super(props);
        document.documentElement.setAttribute("data-browser", navigator.userAgent);

        window.addEventListener("resize", function() {
            let vh = window.innerHeight * 0.01; //fix para calcular cuando vale 1vh en chrome mobile
            document.documentElement.style.setProperty("--vh", `${vh}px`);

        }, false);
    }
    render(){
        return(
            <div className={"container-flex " + styles.containerflex}>
                <div className={"row " + styles.row}>
                    {
                        this.props.token ?
                            <div className={"col-auto  " + styles.menu}>
                                <MenuComponent admin={this.props.admin?this.props.admin:false}/>
                            </div> :
                            null
                    }
                    <div className={"col d-flex flex-column p-0 " + styles.content}>
                        <MainSectionContainer />
                    </div>
                </div>

            </div>
        );
    }
}

export default AppComponent;