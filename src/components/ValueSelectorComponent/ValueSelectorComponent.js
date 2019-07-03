import React, {Component} from 'react'
import PropTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";


import styles from './ValueSelectorComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';



class ValueSelectorComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value? this.props.value:0,
            active: (this.props.value && this.props.value != 0) ? true:false //lo activamos cuando hay un número escrito
        }
        this.dropdown = React.createRef();
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
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
    }

    handleClickOutside(e){
        if(this.dropdown.current.style.display != "" && this.dropdown.current.style.display != "none"){
            this.dropdown.current.style.display = "none";
            this.props.onChangeValue(this.state.value);
        }
    };

    toggleVisibility(){
        if(this.dropdown.current.style.display == "" || this.dropdown.current.style.display == "none")
            this.dropdown.current.style.display = "block";
        else
            this.dropdown.current.style.display = "none";
    }

    render(){
        return(<div className={this.props.displayAsLabel == true ? "btn-group dropleft":"btn-group dropleft "+styles.dropleft}>
                {
                    this.props.displayAsLabel != true ?
                    <button className={this.state.active ? styles.btn_activated:styles.btn} type="button" onClick={this.toggleVisibility}>
                        <i className="fas fa-euro-sign"></i>
                    </button> :
                    <span id="dropdownMenuButton">
                        {
                            this.state.value && !utils.isMobile() ?
                            <div className={styles.hour_value_div}>{this.state.value}</div>:<div className={styles.hour_value_empty}></div>
                        }
                        <button className={this.state.active ? styles.btn_activated:styles.btn} onClick={this.toggleVisibility}>
                            <i className="fas fa-euro-sign"></i>
                        </button>
                    </span>
                }

                <div ref={this.dropdown} className={"dropdown-menu " + styles.menu } >
                    <label>{lang[config.lang].hour_value_input}</label>
                    <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  value={this.state.value} type="number" min="0" />
                </div>
            </div>
        )
    }
}


ValueSelectorComponent.propTypes = {

}


export default onClickOutside(ValueSelectorComponent);