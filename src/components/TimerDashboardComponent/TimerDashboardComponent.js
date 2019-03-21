import React, {Component} from 'react'


import styles from './TimerDashboardComponent.scss';
import NewBlockContainer from '../NewBlockComponent/NewBlockContainer';


class TimerDashboardComponent extends Component{
    constructor(props){
        super(props);

       
    }

   

    render(){
        return(

            <div className={"d-flex flex-column h-100"}>
                <div>
                    <NewBlockContainer />
                </div>
                <div className="flex-grow-1">
                    Listado....  
                </div>

            </div>
        )
    }
}

export default TimerDashboardComponent;