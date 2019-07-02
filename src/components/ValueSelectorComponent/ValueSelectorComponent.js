import React, {Component} from 'react'
import PropTypes from 'prop-types';



import styles from './ValueSelectorComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';



class ValueSelectorComponent extends Component{
    constructor(props){
        super(props);
        console.log(":"+this.props.value);
        this.state = {
            value: this.props.value? this.props.value:0,
            active: (this.props.value && this.props.value != 0) ? true:false //lo activamos cuando hay un número escrito
        }

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.value != this.props.value)
            this.setState({
                value: this.props.value,
                active: (this.props.value && this.props.value != 0) ? true:false
            });
    }


    handleOnChangeInput(e){
        this.setState({
            value: e.target.value,
            active: (e.target.value.length > 0 && e.target.value != 0) ? true:false
        });
        this.props.onChange(e);
    }

    render(){
        return(<div className={this.props.displayAsLabel == true ? "btn-group dropleft":"btn-group dropleft "+styles.dropleft}>
                {
                    this.props.displayAsLabel != true ?
                    <button className={this.state.active ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i className="fas fa-euro-sign"></i>
                    </button> :
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {
                            this.state.value && !utils.isMobile() ?
                            <div className={styles.hour_value_div}>{this.state.value}</div>:<div className={styles.hour_value_empty}></div>
                        }
                        <button className={this.state.active ? styles.btn_activated:styles.btn} >
                            <i className="fas fa-euro-sign"></i>
                        </button>
                    </span>
                }

                <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton" >
                    <label>{lang[config.lang].hour_value_input}</label>
                    <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" value={this.state.value} type="number" min="0" />
                </div>
            </div>
        )
    }
}


ValueSelectorComponent.propTypes = {

}


export default ValueSelectorComponent;