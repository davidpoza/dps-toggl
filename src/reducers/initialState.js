const initialState = {
    userReducer: {
        first_name: null,
        last_name: null,
        avatar_url: null,
        email: null,
        token: null,
        loading: false,
        error: {}
    },
    taskReducer: {
        tasks: [],
        need_refreshing: false,
        loading: false,
        error: {}
    },
    projectReducer: {
        projects: [],
        loading: false,
        error: {}
    },
    tagReducer: {
        tags: [],
        loading: false,
        error: {}
    }
};

export default initialState;