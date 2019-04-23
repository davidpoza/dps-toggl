import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import TagComponent from '../TagComponent/TagComponent';


class TagListComponent extends Component{
    constructor(props){
        super(props);



        this.state = {

        };        
    }

    componentDidUpdate(prevProps){

    }

    

    render(){
        return(
               <ul className="p-0 container-flex">
               {
                   this.props.tags.map((t,index)=><TagComponent key={"tag"+index} tag={t} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/>)
               }
               </ul>        

        )
    }
}


TagListComponent.propTypes = {
    tags: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default TagListComponent;