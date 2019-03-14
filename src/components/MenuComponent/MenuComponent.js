import React, {Component} from 'react'
import styles from './MenuComponent.scss';

class MenuComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.clase}>
                <div className="logo">dpsToggl</div>
                <ul>
                    <li><i className="fas fa-stopwatch"></i> Timer</li>
                    <li><i className="fas fa-chart-bar"></i>Dashboard</li>
                    <li><i className="fas fa-folder-open"></i>Projects</li>
                    <li><i className="fas fa-tags"></i>Tags</li>
                    <li><i className="fas fa-file-alt"></i>Reports</li>
                    <li><i className="fas fa-cogs"></i>Config</li>
                </ul>
            </div>
        )
    }
}

export default MenuComponent;