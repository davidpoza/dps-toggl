import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import styles from './ManualComponent.scss';
import utils from '../../utils';


class ManualComponent extends Component{
    constructor(props){
        super(props); 
        this.handleChange = this.handleChange.bind(this);     
        this.state = {
            startDate: new Date()
        };
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render(){
        return(
            <div>
                <DatePicker locale={es} selected={this.state.startDate} onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default ManualComponent;