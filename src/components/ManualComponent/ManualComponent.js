import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import styles from './ManualComponent.scss';



class ManualComponent extends Component{
    constructor(props){
        super(props); 


    }



    

    render(){
        return(
            <div>
                <DatePicker locale={es} className={styles.date_input} dateFormat="dd/MM/yyyy" selected={this.props.start_date} onChange={this.props.handleDateChange} />
                <input id="start_hour" onChange={this.props.handleHourChange} className={styles.hour_input} maxLength="5" value={this.props.start_hour}/>
                <i className="fas fa-long-arrow-alt-right"></i>
                <input id="end_hour" onChange={this.props.handleHourChange} className={styles.hour_input} maxLength="5" value={this.props.end_hour}/>
            </div>
        )
    }
}

export default ManualComponent;