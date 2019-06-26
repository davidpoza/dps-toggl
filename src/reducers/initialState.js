const initialState = {
    userReducer: {
        id: null,
        first_name: null,
        last_name: null,
        avatar: null,
        email: null,
        token: null,
        admin: false,
        need_refreshing: false,
        loading: false,
        users_id: [],
        users_entities: [],
        sortBy: 'email',
        order: 'asc',
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
        need_refreshing: false,
        loading: false,
        sortBy: 'id',
        order: 'asc',
        error: {}
    },
    tagReducer: {
        tags_id: [],
        tags_entities: [],
        loading: false,
        error: {}
    },
    dashboardReducer: {
        data: [],
        preset: "preset_week",
        loading: false,
        error: {}
    }
};

export default initialState;