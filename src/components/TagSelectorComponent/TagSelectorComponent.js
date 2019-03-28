import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TagSelectorComponent.scss';
import utils from '../../utils';



class TagSelectorComponent extends Component{
    constructor(props){
        super(props);
        

        this.state = {
            tags: [],
            active: false, // lo activamos cuando hay al menos un tag chequeado
        }

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    componentDidMount(){
        this.setState({
            tags: this.props.tags.map((e)=>{
                return(
                    {
                        id: e.id,
                        name: e.name,
                        checked: false
                    }
                )
            })
        });
        let new_tags_array = this.props.tags.slice();
        for(let i=0; i<new_tags_array.lenght; i++){
            if(this.props.selected_tags.includes(new_tags_array[i]))
                new_tags_array[i].checked = true;
            else
                new_tags_array[i].checked = false;
        }
        let actived = new_tags_array.filter((e)=>{return e.checked}).lenght > 0;
        this.setState({
            tags: new_tags_array,
            active: actived
        });
    }

    /** cuando redux cambia las propiedades hay que cambiar el estado para que se ejecute el render,
     * si no lo hacemos la primera carga de la pagina no muestra las props que vienen de async actions
     * porque no ha dado tiempo a llegar en las props cuando se monta el componente
     */
    componentDidUpdate(prevProps){
        if(prevProps.tags != this.props.tags)
            this.setState({
                tags: this.props.tags.map((e)=>{
                    return(
                        {   
                            id: e.id,
                            name: e.name,
                            checked: false
                        }
                    )
                })
            });        
    }

    handleOnChangeInput(e){   
        this.setState({
            value: e.target.value
        });
        let filtered_tags = this.props.tags.filter((elem)=>{
            let regex = new RegExp(e.target.value, "i");            
            return regex.test(elem.name);
        });
        this.setState({
            tags: filtered_tags
        });
    }

    /** Esta función llama al manejador del padre, que hará actualizaciones en las propiedades que esta recibiendo
     * este componente.
     * Mapeamos de nuevo la lista completa de tags a un array de objetos.
     * Y en cada uno de esos objetos activamos la propiedad checked si su id se encuentra en la lista se seleccionados
     * que también recibimos por props.
     * Finalmente modificamos el estado, estableciendo la lista de objetos tags con sus propiedades checked correctas,
     * conforme lo indica la lista selected_tags.
     */
    handleOnSelect(e){
        this.props.onClick(e);
        let new_tags_array = this.props.tags.map((e)=>{
            return(
                {   
                    id: e.id,
                    name: e.name,
                    checked: false
                }
            )
        });
        for(let i=0; i<new_tags_array.length; i++){
            if(this.props.selected_tags.includes(new_tags_array[i].id))
                new_tags_array[i].checked = true;
        }
        let actived = new_tags_array.filter((e)=>{return e.checked}).lenght > 0;
        this.setState({
            tags: new_tags_array,
            active: actived
        });    
    }

    render(){
        return(<div className={"btn-group dropleft"}>
                {
                    <button className={this.state.actived ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i className="fas fa-tags"></i>
                    </button>
                }              

                <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton" >
                    <div className={"input-group "+styles.selector}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                        </div>
                        <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" placeholder="Buscar tag..." value={this.state.value}/>
                    </div>
                    <ul className={styles.taglist}>
                    { this.state.tags.map((e, index)=>{
                        return(
                        <li id={"tag"+e.id} key={"taglist-"+index} onClick={this.handleOnSelect} className={"dropdown-item " + styles.item}>
                         {e.checked ? <i className ="far fa-check-square"></i>:<i className ="far fa-square"></i>}
                         {e.name} {e.id}
                         </li>
                         )
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TagSelectorComponent;