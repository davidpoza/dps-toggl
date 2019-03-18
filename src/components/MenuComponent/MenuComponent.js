import React, {Component} from 'react'
import styles from './MenuComponent.scss';
import logo from '../../images/icon.png';
import LoggedInfoComponent from '../LoggedInfoComponent/LoggedInfoComponent';

class MenuComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="d-flex flex-column justify-content-between h-100">
                <div>
                    <div className={styles.logo}>
                        <img src={logo} />
                        <div className={styles.text}>dpsToggl</div>
                    </div>
                    <ul className = {"fa-ul "+styles.ul}>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-stopwatch"></i></span><span className={styles.item_text}>Timer</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-chart-bar"></i></span><span className={styles.item_text}>Dashboard</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-folder-open"></i></span><span className={styles.item_text}>Projects</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-tags"></i></span><span className={styles.item_text}>Tags</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-file-alt"></i></span><span className={styles.item_text}>Reports</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-cogs"></i></span><span className={styles.item_text}>Config</span></li>
                    </ul>
                </div>
                 
                        <LoggedInfoComponent username="David Poza" expanded="false" />
                
            </div>
        )
    }
}

export default MenuComponent;