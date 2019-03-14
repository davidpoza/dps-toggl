import React, {Component} from 'react'
import styles from './MenuComponent.scss';
import logo from '../../images/icon.png';

class MenuComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.clase}>
                <div className={styles.logo}>
                    <img src={logo} />
                    <div className={styles.text}>dpsToggl</div>
                </div>
                <ul className = "fa-ul">
                    <li><span className = "fa-li"><i className="fas fa-stopwatch"></i></span><span className={styles.item_text}>Timer</span></li>
                    <li><span className = "fa-li"><i className="fas fa-chart-bar"></i></span><span className={styles.item_text}>Dashboard</span></li>
                    <li><span className = "fa-li"><i className="fas fa-folder-open"></i></span><span className={styles.item_text}>Projects</span></li>
                    <li><span className = "fa-li"><i className="fas fa-tags"></i></span><span className={styles.item_text}>Tags</span></li>
                    <li><span className = "fa-li"><i className="fas fa-file-alt"></i></span><span className={styles.item_text}>Reports</span></li>
                    <li><span className = "fa-li"><i className="fas fa-cogs"></i></span><span className={styles.item_text}>Config</span></li>
                </ul>
            </div>
        )
    }
}

export default MenuComponent;