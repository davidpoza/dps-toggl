import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as reportActions from '../../actions/reportActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TaskDatesReportComponent from './TaskDatesReportComponent';

class ReportResultsContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <TaskDatesReportComponent
            token={this.props.token}
            user_id={this.props.user_id}
            dates={this.props.dates}
            need_refreshing={this.props.need_refreshing}
            dates_entities = {this.props.dates_entities}
            tasks_entities = {this.props.tasks_entities}
            tags_entities = {this.props.tags_entities}
            projects_entities = {this.props.projects_entities}
            tags_id = {this.props.tags_id}
            projects_id = {this.props.projects_id}
            userActions={this.props.userActions}
            reportActions={this.props.reportActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}
            onResume={this.props.onResume}
            date_start={this.props.date_start}
            date_end={this.props.date_end}
            date_preset={this.props.date_preset}
            limit={this.props.limit}
            total_tasks={this.props.total_tasks}
            />
        )
    }
}

function mapStateToProps (state) {

    return {
      //denormalizacion
      token: state.userReducer.token,
      user_id: state.userReducer.id,
      dates: state.reportReducer.dates_id.map(e=>state.reportReducer.dates_entities[e]),
      dates_entities: state.reportReducer.dates_entities,
      tasks_entities: state.reportReducer.tasks_entities,
      //tasks_tags_entities: state.reportReducer.tasks_tags_entities,
      tags_entities: state.reportReducer.tags_entities,
      projects_entities: state.reportReducer.projects_entities,
      tags_id: state.reportReducer.tags_id,
      projects_id: state.reportReducer.projects_id,
      total_tasks: state.reportReducer.total_tasks,
      limit: state.reportReducer.timer_section_load_limit,
      date_start: state.reportReducer.date_start,
      date_end: state.reportReducer.date_end,
      date_preset: state.reportReducer.preset,
      need_refreshing: state.reportReducer.need_refreshing,
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
      reportActions: bindActionCreators(reportActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
      tagActions: bindActionCreators(tagActions, dispatch),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReportResultsContainer);
