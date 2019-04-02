import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TagSelectorComponent.scss';
import utils from '../../utils';



class TagSelectorComponent extends Component{
    constructor(props){
        super(props);
        

        this.state = {
            value:"",
            active: false, // lo activamos cuando hay al menos un tag chequeado
        }

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    componentDidMount(){
        if(this.props.tags){
            this.setState({
                tags: this.props.tags
            });
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.tags != this.props.tags){
            this.setState({
                tags: this.props.tags
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
            tags: filtered_tags
        });
    }


    render(){
        return(<div className={"btn-group dropleft"}>
                {
                    this.props.displayAsLabel != true ?
                    <button className={this.state.actived ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i className="fas fa-tags"></i>
                    </button> :
                    <span id="dropdownMenuButton" className={styles.label} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { 
                            this.state.tags.filter((e)=>(e.checked)).length > 0 ? this.state.tags.reduce((prev, curr)=>{
                                    if(prev.checked && curr.checked)
                                    return(
                                        prev.name + ", " + curr.name
                                    )
                                    else if(prev.checked && !curr.checked)
                                        return(
                                            prev.name
                                    )
                                    else if(!prev.checked && curr.checked)
                                        return(
                                            curr.name
                                    )

                    
                                  
                        }):
                            <button className={this.state.actived ? styles.btn_activated:styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
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
                    { this.state.tags && this.state.tags.map((e, index)=>{
                        return(
                        <li id={"tag"+e.id} key={"taglist-"+index} onClick={this.props.onClick} className={"dropdown-item " + styles.item}>
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