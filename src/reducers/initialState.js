const initialState = {
    userReducer: {
        id: null,
        first_name: null,
        last_name: null,
        avatar: null,
        email: null,
        created_on: null,
        updated_on: null,
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
        timer_section_load_limit: 7, //días que cargamos como máximo inicialmente
        total_tasks: 0, //total de días que devuelve la consulta sin el limit
        error: {}
    },
    reportReducer: {
        tasks_id: [],
        tasks_entities: [],
        dates: [],
        dates_id: [],
        dates_entities: [],
        tags_entities: [],
        projects_entities: [],
        tags_id: [],
        projects_id: [],
        preset: "preset_month",
        need_refreshing: false,
        loading: false,
        total_results: 0, //total de días que devuelve la consulta sin el limit
        error: {}
    },
    projectReducer: {
        projects_id: [],
        projects_entities: [],
        users_entities: [],
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
        total_tasks: 0, //total de días que devuelve la consulta sin el limit
        error: {}
    }
};

export default initialState;