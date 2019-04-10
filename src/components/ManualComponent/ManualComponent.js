import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
import PropTypes from 'prop-types';


import "react-datepicker/dist/react-datepicker.css";
import styles from './ManualComponent.scss';
import utils from '../../utils';


class ManualComponent extends Component{
    constructor(props){
        super(props); 


    }

    render(){
        return(
            <div>
                {utils.isMobile() ?
                <DatePicker 
                    locale={es} 
                    className={styles.date_input} 
                    dateFormat="dd/MM/yyyy"
                    selected={this.props.date}
                    onChange={this.props.handleDateChange}
                    popperPlacement="bottom"
                /> :
                <DatePicker 
                    locale={es} 
                    className={styles.date_input} 
                    dateFormat="dd/MM/yyyy"
                    selected={this.props.date}
                    onChange={this.props.handleDateChange}
                />
                }
                
                <input id="start_hour" onChange={this.props.handleHourChange} className={styles.hour_input} maxLength="5" value={this.props.start_hour}/>
                <i className="fas fa-long-arrow-alt-right"></i>
                <input id="end_hour" onChange={this.props.handleHourChange} className={styles.hour_input} maxLength="5" value={this.props.end_hour}/>
            </div>
        )
    }
}


ManualComponent.propTypes = {
    date: PropTypes.object.isRequired,
    start_hour: PropTypes.string.isRequired,
    end_hour: PropTypes.string.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    handleHourChange: PropTypes.func.isRequired
}

export default ManualComponent;