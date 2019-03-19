import React, {Component} from 'react'
import loadingImage from '../../images/loading.gif'

import styles from './LoadingComponent.scss';



class LoadingComponent extends Component{
    constructor(props){
        super(props);      
    }

 

    render(){
        if (this.props.isLoading)
        return(            
            <div className={styles.loadingImage}>
                <img src={loadingImage} />
            </div>
        )
        return(<div></div>);
    }
}

export default LoadingComponent;