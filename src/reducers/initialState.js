const initialState = {
    userReducer: {
        first_name: null,
        last_name: null,
        avatar_url: null,
        email: null,
        token: null,
        loading: false,
        users_id: [],
        users_entities: [],
        error: {}
    },
    taskReducer: {
        tasks_id: [],
        tasks_entities: [],
        dates: [],
        dates_id: [],
        dates_entities: [],
        tasks_tags_entities: [],
        need_refreshing: false,
        loading: false,
        error: {}
    },
    projectReducer: {

        projects_id: [],
        projects_entities: [],
        project_detail: {},
        need_refreshing: false,
        loading: false,
        error: {}
    },
    tagReducer: {
        tags_id: [],
        tags_entities: [],
        loading: false,
        error: {}
    }
};

export default initialState;