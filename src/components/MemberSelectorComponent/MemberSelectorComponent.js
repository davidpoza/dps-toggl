import React, {Component} from 'react'
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './MemberSelectorComponent.scss';





class MemberSelectorComponent extends Component{
    constructor(props){
        super(props);
        
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

        this.state = {
            users: [],
            user_id: null, //id de usuario seleccionado
            value: "", //es el valor del input para filtrar
            isOverList: false
        }


    }

    /** se ejecuta onChange del input de filtrado de proyectos */
    handleOnChangeInput(e){   
        this.setState({
            value: e.target.value
        });
        if(e.target.value.length > 0){
            let filtered_users = this.props.users.filter((u)=>{
                let regex = new RegExp(e.target.value, "i");  //para el filtrado usamos una regex que ignore mayus/min          
                return regex.test(u.first_name+" "+u.last_name+" "+u.email);
            });
            this.setState({
                users: filtered_users
            });
        }
        else
            this.setState({
                users: []
            });    
    }

    handleOnBlur(e){
        if(!this.state.isOverList)
            this.setState({
                users: []
            });       
    }
    
    handleOnMouseEnter(e){
        this.setState({
            isOverList: true
        });
    }

    handleOnMouseLeave(e){
        this.setState({
            isOverList: false
        });
    }

    handleOnFocus(e){
        if(this.state.value.length > 0)
            this.handleOnChangeInput(e);
    }

    handleOnSelect(user_id){
        this.props.onSelect(user_id); // pasamos al componente padre para que gestione la llamada al api
        this.setState({
            users: [],
            value: ""
        });
        
    }

    render(){
        return(<div className={styles.autocomplete}>
                 <input type="text" className={styles.input} placeholder={lang[config.lang].add_member_placeholder} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} onChange={this.handleOnChangeInput} value={this.state.value} />
                 {
                    this.state.users.length >0 && <div className={styles.autocomplete_list}>
                    {this.state.users.map((e,index)=>{
                        return(
                            <div id={"user_"+index} key={"user_"+index} className={styles.autocomplete_item} onClick={this.handleOnSelect.bind(this,e.id)} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
                                <div>{e.first_name} {e.last_name}</div>
                                <div>{e.email}</div>
                            </div>
                        );
                    })}
                    </div>
                }
            </div>
        )
    }
}

MemberSelectorComponent.propTypes = {
 users: PropTypes.array.isRequired,
 userActions: PropTypes.object.isRequired,
 project_id: PropTypes.number.isRequired,
 onSelect: PropTypes.func.isRequired
}

export default MemberSelectorComponent;