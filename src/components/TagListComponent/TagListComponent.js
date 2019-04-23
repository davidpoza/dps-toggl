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
                   this.props.tags.map((t,index)=><TagComponent ctx={this.props.ctx} key={"tag"+index} tag={t} onOpenDeleteModal={this.props.onOpenDeleteModal} onOpenUpdateModal={this.props.onOpenUpdateModal}/>)
               }
               </ul>        

        )
    }
}


TagListComponent.propTypes = {
    ctx: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    onOpenDeleteModal: PropTypes.func.isRequired,
    onOpenUpdateModal: PropTypes.func.isRequired,
}

export default TagListComponent;