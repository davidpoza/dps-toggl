import React, {Component} from "react";
import PropTypes from "prop-types";

import styles from "./TextFilterComponent.scss";

/**Properties
 * apply_filter_callback                   : handler function called on lost lost focus.
 *                                           The handler must have the next prototype:
 *       handler(string with input text) *
 *
 * placeholder: placeholder for filter input
 * icon       : an fontawesome icon identifier

*/

class TextFilterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "", //el valor del input de filtrado
            active: false
        };
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    //se ejecuta onChange del input
    handleOnChangeInput(e){
        this.setState({
            value: e.target.value,
            active: e.target.value.length > 0
        });
    }

    render(){
        return(
            <div className={styles.group}>
                <i style={{verticalAlign:"baseline"}} className={this.state.active?styles.icon_active + " fas "+ this.props.icon : styles.icon + " fas "+ this.props.icon}></i>
                <input className={styles.input} onBlur={this.props.apply_filter_callback.bind(this, this.state.value)} onChange={this.handleOnChangeInput} placeholder={this.props.placeholder} value={this.state.value}/>
            </div>
        );
    }
}


TextFilterComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired, //font-awesome icon identifier, example fa-tags
    apply_filter_callback: PropTypes.func.isRequired,
};


export default TextFilterComponent;