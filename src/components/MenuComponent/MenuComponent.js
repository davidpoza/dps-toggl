import React, {Component} from 'react'
import styles from './MenuComponent.scss';

class MenuComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.clase}>
                <div className={styles.logo}>dpsToggl</div>
                <ul className = "fa-ul">
                    <li><span className = "fa-li"><i className="fas fa-stopwatch"></i></span>Timer</li>
                    <li><span className = "fa-li"><i className="fas fa-chart-bar"></i></span>Dashboard</li>
                    <li><span className = "fa-li"><i className="fas fa-folder-open"></i></span>Projects</li>
                    <li><span className = "fa-li"><i className="fas fa-tags"></i></span>Tags</li>
                    <li><span className = "fa-li"><i className="fas fa-file-alt"></i></span>Reports</li>
                    <li><span className = "fa-li"><i className="fas fa-cogs"></i></span>Config</li>
                </ul>
            </div>
        )
    }
}

export default MenuComponent;