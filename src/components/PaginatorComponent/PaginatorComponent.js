import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './PaginatorComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';


class PaginatorComponent extends Component{
    constructor(props){
        super(props);


    }




    render(){
        let number_of_pages = Math.floor(this.props.total_records/this.props.records_per_page);
        let pags = [];
        let range = 3; //cuando aparecen este numero de paginas seguidas se indica como n ... m
        let current_page = parseInt(this.props.current_page);
        let previous_page = current_page - 1;
        let next_page = current_page + 1;

        for(let i=1; i<=number_of_pages; i++){
            if((i==1 || i == number_of_pages || i == current_page || (i > current_page && number_of_pages-current_page < range || i < current_page && current_page <= range )) && i != (current_page-1) && i != (current_page+1)) // 1  "5"  10
                pags.push(<Link key={"link_page_"+i} to={this.props.base_url+i}><button key={"page_"+i} className={i==current_page? styles.active_page:styles.page}>{i}</button></Link>);

            // ... 4
            else if(i == (current_page-1) && current_page > range)
                pags.push(<div key={"div_page_"+i} className={styles.page_range}> ... <Link to={this.props.base_url+i}><button key={"page_"+i} className={i==current_page? styles.active_page:styles.page}>{i}</button></Link></div>);

            // 4
            else if(i == (current_page-1) && current_page <= range)
                pags.push(<Link key={"link_page_"+i} to={this.props.base_url+i}><button key={"page_"+i} className={i==current_page? styles.active_page:styles.page}>{i}</button></Link>);

            // 6 ...
            else if(i == (current_page+1) && (number_of_pages-current_page) >= range)
                pags.push(<div key={"div_page_"+i} className={styles.page_range}><Link to={this.props.base_url+i}><button key={"page_"+i} className={i==current_page? styles.active_page:styles.page}>{i}</button></Link> ... </div>);

            // 6
            else if(i == (current_page+1) && (number_of_pages-current_page) < range)
                pags.push(<Link key={"link_page_"+i} to={this.props.base_url+i}><button key={"page_"+i} className={i==current_page? styles.active_page:styles.page}>{i}</button></Link>);
        }
        if(number_of_pages > 1)
            return(
                <div className={styles.paginator}>
                    {
                        current_page > 1 &&
                        <Link key={"link_previous_page"} to={this.props.base_url+previous_page}><button className={styles.btn}><i className="fas fa-arrow-left"></i></button></Link>
                    }
                    {pags}
                    {
                        current_page < number_of_pages &&
                        <Link key={"link_next_page"} to={this.props.base_url+next_page}><button className={styles.btn}><i className="fas fa-arrow-right"></i> {!utils.isMobile() && lang[config.lang].paginator_next_label}</button></Link>
                    }
                </div>
            )
        else
            return null;
    }
}

PaginatorComponent.propTypes = {

}

export default PaginatorComponent;