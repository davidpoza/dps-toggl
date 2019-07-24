import React, {Component} from "react";
import PropTypes from "prop-types";

import styles from "./TagSelectorComponent.scss";
import utils from "../../utils";


class TagSelectorComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            tags: [], //la lista de tags que vamos a usar para mostrarlos como labels
            filtered_tags: [], //la lista que vamos a listar en el dropdown, deben ser independientes para que no deseaparezcan labels durante el filtrado
            value:"", //el valor del input de filtrdo de la lista de tags
            active: false, // lo activamos cuando hay al menos un tag chequeado, para indicar visualmente que ya se han marcado tags
        };

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    componentWillMount(){
        if(this.props.tags){
            this.setState({
                tags: this.props.tags,
                filtered_tags: this.props.tags
            });
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.tags != this.props.tags){
            this.setState({
                tags: this.props.tags,
                filtered_tags: this.props.tags,
                active: this.props.tags.filter((e)=>(e.checked)).length > 0 ? true:false //indica si hay al menos un tag marcado
            });
        }
    }

    /** se ejecuta onChange del input de filtrado de tags */
    handleOnChangeInput(e){
        this.setState({
            value: e.target.value
        });
        let filtered_tags = this.props.tags.filter((elem)=>{
            let regex = new RegExp(e.target.value, "i");  //para el filtrado usamos una regex que ignore mayus/min
            return regex.test(elem.name);
        });
        this.setState({
            filtered_tags: filtered_tags
        });
    }

    /**al chequear un tag para añadirlo, borramos el input de filtrado si lo hubiera
     * y pasamos el evento al padre: NewBlockComponent
     */
    handleOnClick(tag_id){
        this.props.onClick(tag_id);
        this.setState({
            value: ""
        });
    }


    render(){
        let cadena = "";
        return(<div className={this.props.displayAsLabel == true ? "btn-group dropleft":"btn-group dropleft "+styles.dropleft}>
            {
                this.props.displayAsLabel != true ?
                    <button className={this.state.active ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i className="fas fa-tags"></i>
                    </button> :
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {
                            this.state.tags.filter((e)=>(e.checked)).length > 0 ? (
                                <button className={styles.label}>
                                    {
                                        this.state.tags.filter((e)=>(e.checked)).map((e,index, arr)=>{
                                            if(index == arr.length -1)
                                                cadena+= utils.isMobile() ? e.name.substring(0,4) : e.name;
                                            else
                                                cadena+= utils.isMobile() ? e.name.substring(0,4) + "," : e.name + ", ";
                                        })

                                    }
                                    {utils.isMobile()?cadena.substring(0,16):cadena.substring(0,20)}
                                    {(cadena.length > 16 && utils.isMobile() || cadena.length > 20 && !utils.isMobile()) && <span>...</span>}
                                </button>

                            ):
                                <button className={styles.btn} >
                                    <i className="fas fa-tags"></i>
                                </button>

                        }
                    </span>
            }

            <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton" >
                <div className={"input-group "+styles.selector}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                    </div>
                    <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" placeholder="Buscar tag..." value={this.state.value}/>
                </div>
                <ul className={styles.taglist}>
                    { this.state.filtered_tags && this.state.filtered_tags.map((e, index)=>{
                        return(
                            <li id={"tag"+e._id} key={"taglist-"+index} onClick={this.handleOnClick.bind(this, e._id)} className={"dropdown-item " + styles.item}>
                                {e.checked ? <i className ="far fa-check-square"></i>:<i className ="far fa-square"></i>}
                                {e.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        );
    }
}


TagSelectorComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
};


export default TagSelectorComponent;