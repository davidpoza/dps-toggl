import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../../config/config';
import lang from '../../config/lang';
import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'
import * as reportActions from '../../actions/reportActions'
import ReportSectionComponent from './ReportSectionComponent';





class ReportSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <ReportSectionComponent
            user_loading={this.props.user_loading}
            report_loading={this.props.report_loading}
            project_loading={this.props.project_loading}
            tag_loading={this.props.tag_loading}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}
            reportActions={this.props.reportActions}
            preset={this.props.preset}
            date_start={this.props.date_start}
            date_end={this.props.date_end}
            token={this.props.token}
            user_id={this.props.user_id}
            data={this.props.data}
            projects={this.props.projects}
            users={this.props.users}
            total_results={this.props.total_results}
            />
        )
    }
}

function mapStateToProps (state) {
  //mapeamos los objetos del array tal y como los requiere CheckboxFilterComponent

  let projects_filter_component = state.reportReducer.projects_id.map(e=>{
    e = state.reportReducer.projects_entities[e];
    if(!e.id) e.id = e._id;
    if(!e.label) e.label = e.name;
    return e;
  });
  projects_filter_component.unshift({id:-1,label:lang[config.lang].project_selector_no_project, color: "#a9a9a9"});

  let users_filter_component = state.userReducer.users_id.map(e=>{
    e = state.userReducer.users_entities[e];
    if(!e.id) e.id = e._id;
    if(!e.label) e.label = e.email;
    return e;
  });

    return {
      user_loading: state.userReducer.loading,
      report_loading: state.reportReducer.loading,
      project_loading: state.projectReducer.loading,
      tag_loading: state.tagReducer.loading,
      preset: state.reportReducer.preset,
      date_start: state.reportReducer.date_start,
      date_end: state.reportReducer.date_end,
      token: state.userReducer.token,
      user_id: state.userReducer.id,
      data: state.dashboardReducer.data,
      projects: projects_filter_component,
      users: users_filter_component,
      total_results: state.reportReducer.total_results
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
      taskActions: bindActionCreators(taskActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
      tagActions: bindActionCreators(tagActions, dispatch),
      reportActions: bindActionCreators(reportActions, dispatch),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReportSectionContainer);
