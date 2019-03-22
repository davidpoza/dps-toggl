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
        need_refreshing: false    
    }
};

export default initialState;