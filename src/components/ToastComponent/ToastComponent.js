import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './ToastComponent.scss';


/** Este componente muestra mensajes flotantes apilados en la esquina inferior derecha
 * usando bootstrap toast.
*/
class ToastComponent extends Component{
    constructor(props){
        super(props);

        this.thereAreMessages = this.thereAreMessages.bind(this);
        this.emptyMessages = this.emptyMessages.bind(this);
    }


    componentDidMount() {
        this.emptyMessages();
    }

    componentDidUpdate(){
        if (this.thereAreMessages()){
            $(this.toast).toast("show");
            setTimeout(()=>this.emptyMessages(), 2000);
        }
        else{
            $(this.toast).toast("hide");

        }

    }

    emptyMessages(){
        if(this.props.userMessage != undefined) this.props.userActions.cleanMessage();
        if(this.props.taskMessage != undefined) this.props.taskActions.cleanMessage();
        if(this.props.tagMessage != undefined) this.props.tagActions.cleanMessage();
        if(this.props.projectMessage != undefined) this.props.projectActions.cleanMessage();
    }

    thereAreMessages(){
        return this.props.userMessage != undefined || this.props.taskMessage != undefined || this.props.tagMessage != undefined || this.props.projectMessage != undefined;
    }

    render(){
        if(this.thereAreMessages())
            return(

                <div className={"toast " + styles.mytoast} ref={element => this.toast = element} role="alert" aria-live="assertive" aria-atomic="true" data-delay="6000">
                    <div className={"toast-header " + styles.header}>
                        <i className="fas fa-exclamation-triangle"></i>
                        <strong className="mr-auto">Error</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {this.props.userMessage ? this.props.userMessage :
                         this.props.taskMessage ? this.props.taskMessage :
                         this.props.projectMessage ? this.props.projectMessage :
                         this.props.tagMessage}
                    </div>
                </div>

            )
        return null;
    }
}

ToastComponent.propTypes = {
    message: PropTypes.string,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
}

export default ToastComponent;