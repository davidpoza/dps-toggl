import React, {Component} from "react";

import styles from "./LoadingComponent.scss";

class LoadingComponent extends Component{
    constructor(props){
        super(props);
    }


    render(){
        if (this.props.isLoading)
            return(
                <div className={styles.loading}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
            );
        return(<div className={styles.loadingImage}></div>);
    }
}

export default LoadingComponent;