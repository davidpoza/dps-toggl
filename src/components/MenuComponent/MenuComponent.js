import React, {Component} from 'react';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './MenuComponent.scss';
import logo from '../../images/icon.png';
import {NavLink} from 'react-router-dom';
import LoggedInfoContainer from '../LoggedInfoComponent/LoggedInfoContainer';

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
                        <div className={styles.text}>{config.app_title}</div>
                    </div>
                    <ul className = {"fa-ul "+styles.ul}>
                        <li className={styles.li}><NavLink exact={true} activeClassName={styles.is_active} to="/"><span className = "fa-li"><i className="fas fa-stopwatch"></i></span><span className={styles.item_text}>{lang[config.lang].menu_timer}</span></NavLink></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-chart-bar"></i></span><span className={styles.item_text}>{lang[config.lang].menu_dashboard}</span></li>
                        <li className={styles.li}><NavLink activeClassName={styles.is_active} to="/projects"><span className = "fa-li"><i className="fas fa-folder-open"></i></span><span className={styles.item_text}>{lang[config.lang].menu_projects}</span></NavLink></li>
                        <li className={styles.li}><NavLink exact={true} activeClassName={styles.is_active} to="/tags"><span className = "fa-li"><i className="fas fa-tags"></i></span><span className={styles.item_text}>{lang[config.lang].menu_tags}</span></NavLink></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-file-alt"></i></span><span className={styles.item_text}>{lang[config.lang].menu_reports}</span></li>
                        <li className={styles.li}><span className = "fa-li"><i className="fas fa-users"></i></span><span className={styles.item_text}>{lang[config.lang].menu_users}</span></li>
                        <li className={styles.li}><NavLink exact={true} activeClassName={styles.is_active} to="/config"><span className = "fa-li"><i className="fas fa-cogs"></i></span><span className={styles.item_text}>{lang[config.lang].menu_config}</span></NavLink></li>
                    </ul>
                    
                </div>
                 
                <LoggedInfoContainer />
                
            </div>
        )
    }
}

export default MenuComponent;