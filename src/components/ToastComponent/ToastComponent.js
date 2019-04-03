import React, {Component} from 'react'


import styles from './ToastComponent.scss';


/** Este componente muestra mensajes flotantes apilados en la esquina inferior derecha 
 * usando bootstrap toast.
*/
class ToastComponent extends Component{
    constructor(props){
        super(props);

     
    }


    render(){
        if(this.props.message)
            return(
                <div id={this.props.id} className={"toast " + styles.mytoast} role="alert" aria-live="assertive" aria-atomic="true" data-delay="6000">
                    <div className={"toast-header " + styles.header}>
                        <i className="fas fa-exclamation-triangle"></i> 
                        <strong className="mr-auto">Error</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {this.props.message}
                    </div>
                </div>
            )
        else
            return null;        
    }
}

export default ToastComponent;