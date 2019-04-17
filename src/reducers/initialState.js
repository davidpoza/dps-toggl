const initialState = {
    userReducer: {
        first_name: null,
        last_name: null,
        avatar_url: null,
        email: null,
        token: null,
        loading: false,
        users: [],
        users_entities: [],
        error: {}
    },
    taskReducer: {
        tasks: [], // array de objetos  {date:string, tasks:array de objetos}
        tasks_entities: [],
        need_refreshing: false,
        loading: false,
        error: {}
    },
    projectReducer: {
        projects: [],
        projects_entities: [],
        project_detail: {},
        need_refreshing: false,
        loading: false,
        error: {}
    },
    tagReducer: {
        tags: [],
        tags_entities: [],
        loading: false,
        error: {}
    }
};

export default initialState;