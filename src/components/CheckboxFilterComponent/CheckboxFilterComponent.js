import React, {Component} from 'react'
import PropTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";


import styles from './CheckboxFilterComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';

/**Properties
 * apply_filter_callback                   : handler function called on lost lost focus and close dropdown
 *                                           The handler must have the next prototype:
 *       handler(ids_array)                  handler will receive an array of checked elements ids.
 *
 * reset_filter_callback: handle function called from parent when click on reset filter button.
 *
 * placeholder: placeholder for filter input
 * icon       : an fontawesome icon identifier
 * list       : list of all available element as array of objects with this structure:
 *     - id
 *     - color (optional)
 *     - label
 * list_checked: list of all element ids which were checked. It's used when render component after executing a quety
 *               to keep cheked the current filters.
*/

class CheckboxFilterComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "", //el valor del input de filtrado
            active: false, // lo activamos cuando hay al menos un elemento chequeado
            list: [], //la lista de elementos que vamos a usar para mostrarlos como lista
            filtered_list: [], //la lista que vamos a listar en el dropdown, deben ser independientes para que no deseaparezcan elementos durante el filtrado
        }
        this.dropdown = React.createRef();
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    componentWillMount(){
        if(this.props.list){
            //añadimos el flag checked a los objetos del array de elementos
            let list = this.props.list.map(e=>{e.checked = false; return e;})

            this.setState({
                list: list,
                filtered_list: list
            });
        }
    }

    //cuando varía el parametro list => setState => redibujamos el componente
    componentDidUpdate(prevProps){
        if(prevProps.list != this.props.list){
             //ahora marcamos aquellos elementos que vienen marcados previamente según indica this.props.list_checked.
            let list_checked = this.props.list_checked;
            let list = this.props.list.map(e=>{
                if(list_checked.includes(e.id))
                    e.checked = true;
                return e;
            });
            this.setState({
                list: list,
                filtered_list: list,
                active: list.filter((e)=>(e.checked)).length > 0 ? true:false //indica si hay al menos un elemento marcado
            });
        }
    }

    //se ejecuta onChange del input de filtrado de elementos
    handleOnChangeInput(e){
        this.setState({
            value: e.target.value
        });
        let filtered_list = this.props.list.filter((elem)=>{
            let regex = new RegExp(e.target.value, "i");  //para el filtrado usamos una regex que ignore mayus/min
            return regex.test(elem.label);
        });
        this.setState({
            filtered_list: filtered_list
        });
    }

    //al hacer click en un elemento hacemos un toggle de su propiedad checked.
    handleOnClick(id){
        let new_list = this.state.list.map(e=>{
            if(e.id == id)
                e.checked = e.checked ? false : true;
            return e;
        })
        this.setState({
            value: "",
            list: new_list
        });
    }

    //oculta el dropdown cuando pierde el foco
    handleClickOutside(e){
        if(this.dropdown.current.style.display != "" && this.dropdown.current.style.display != "none"){
            this.dropdown.current.style.display = "none";
            let array_ids = this.state.list.filter(e=>e.checked).map(e=>e.id);
            this.props.apply_filter_callback(array_ids); //pasamos un array con los ids de elementos marcados
            this.setState({
                value: ""
            });
        }
    };

    //alterna la visibilidad del dropdown (lo abre o lo cierra)
    toggleVisibility(){
        if(this.dropdown.current.style.display == "" || this.dropdown.current.style.display == "none")
            this.dropdown.current.style.display = "block";
        else{
            this.dropdown.current.style.display = "none";
            let array_ids = this.state.list.filter(e=>e.checked).map(e=>e.id);
            this.props.apply_filter_callback(array_ids);
        }
    }

    render(){
        return(
            <div className={"btn-group dropright "+styles.btn_group}>
                <button className={this.state.active ? styles.btn_activated:styles.btn} type="button" onClick={this.toggleVisibility} >
                    <i style={{verticalAlign:"baseline"}} className={"fas "+ this.props.icon}></i>
                </button>
                <div ref={this.dropdown} className={"dropdown-menu " + styles.menu } >
                    <div className={"input-group "+styles.selector}>
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                        </div>
                        <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input} placeholder={this.props.placeholder} value={this.state.value}/>
                    </div>
                    <ul className={styles.list}>
                    { this.state.filtered_list && this.state.filtered_list.map((e, index)=>{
                        return(
                        <li id={"filter_element_"+e.id} key={"list-element-"+index} onClick={this.handleOnClick.bind(this, e.id)} className={"dropdown-item " + styles.item} style={{color: e.color}}>
                         {e.checked ? <i className ="far fa-check-square"></i>:<i className ="far fa-square"></i>}
                         {e.label}
                         </li>
                         )
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}


CheckboxFilterComponent.propTypes = {
    list: PropTypes.array.isRequired,
    list_checked: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired, //font-awesome icon identifier, example fa-tags
    apply_filter_callback: PropTypes.func.isRequired,
    reset_filter_callback: PropTypes.func.isRequired,
}


export default onClickOutside(CheckboxFilterComponent);