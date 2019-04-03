import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TagSelectorComponent.scss';
import utils from '../../utils';



class TagSelectorComponent extends Component{
    constructor(props){
        super(props);
        

        this.state = {
            tags: [],
            filtered_tags: [],
            value:"",
            active: false, // lo activamos cuando hay al menos un tag chequeado
        }

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
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
                active: this.props.tags.filter((e)=>(e.checked)).length > 0 ? true:false
            });
        }
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
            filtered_tags: filtered_tags
        });
    }

    handleOnClick(e){
        this.props.onClick(e);
        this.setState({
            value: ""
        });
    }


    render(){
        return(<div className={"btn-group dropleft"}>
                {
                    this.props.displayAsLabel != true ?
                    <button className={this.state.active ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i className="fas fa-tags"></i>
                    </button> :
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { 
                            this.state.tags.filter((e)=>(e.checked)).length > 0 ? (
                                <span className={styles.label}>
                                {
                                    this.state.tags.filter((e)=>(e.checked)).map((e,index, arr)=>{
                                    if(index == arr.length -1)
                                        return utils.isMobile() ? e.name.substring(0,4) : e.name
                                    else
                                        return utils.isMobile() ? e.name.substring(0,4) + "," : e.name + ","
                                    })
                                }
                                </span>
                                
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
                        <li id={"tag"+e.id} key={"taglist-"+index} onClick={this.handleOnClick} className={"dropdown-item " + styles.item}>
                         {e.checked ? <i className ="far fa-check-square"></i>:<i className ="far fa-square"></i>}
                         {e.name}
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