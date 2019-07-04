//userReducer

export const REFRESH_TOKEN_ATTEMPT = "REFRESH_TOKEN_ATTEMPT";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGIN_USER_ATTEMPT = "LOGIN_USER_ATTEMPT";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const REGISTER_USER_ATTEMPT = "REGISTER_USER_ATTEMPT";

export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const FETCH_USERS_ATTEMPT = "FETCH_USERS_ATTEMPT";

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";
export const FETCH_USER_ATTEMPT = "FETCH_USER_ATTEMPT";

export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
export const DELETE_USER_ATTEMPT = "DELETE_USER_ATTEMPT";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const UPDATE_USER_ATTEMPT = "UPDATE_USER_ATTEMPT";

export const LOGOUT_USER = "LOGOUT_USER";

export const CHANGE_USER_SORT = "CHANGE_USER_SORT";

export const CLEAN_USER_MESSAGE = "CLEAN_USER_MESSAGE";
///////////////////////////////////////////////////


// taskReducer
export const CREATE_TASK_ATTEMPT = "TASK_CREATE_ATTEMPT";
export const CREATE_TASK_SUCCESS = "TASK_CREATE_SUCCESS";
export const CREATE_TASK_FAIL = "TASK_CREATE_FAIL";

export const DELETE_TASK_VISUALLY = "DELETE_TASK_VISUALLY";
export const DELETE_TASK_ATTEMPT = "DELETE_TASK_ATTEMPT";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAIL = "DELETE_TASK_FAIL";

export const UPDATE_TASK_VISUALLY = "UPDATE_TASK_VISUALLY";
export const UPDATE_TASK_ATTEMPT = "UPDATE_TASK_ATTEMPT";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAIL = "UPDATE_TASK_FAIL";

export const FETCH_TASK_ATTEMPT = "FETCH_TASK_ATTEMPT";
export const FETCH_TASK_SUCCESS = "FETCH_TASK_SUCCESS";
export const FETCH_TASK_FAIL = "FETCH_TASK_FAIL";

export const FETCH_TASKS_ATTEMPT = "FETCH_TASKS_ATTEMPT";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAIL = "FETCH_TASKS_FAIL";

export const UPDATE_DATE_VISUALLY = "UPDATE_DATE_VISUALLY";

export const LOAD_MORE_TASKS = "LOAD_MORE_TASKS";
export const RESET_LIMIT = "RESET_LIMIT";

export const COLLAPSE_DATE = "COLLAPSE_DATE";

export const CLEAN_TASK_MESSAGE = "CLEAN_TASK_MESSAGE";

///////////////////////////////////////////////////


// projectReducer
export const CREATE_PROJECT_ATTEMPT = "CREATE_PROJECT_ATTEMPT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAIL = "CREATE_PROJECT_FAIL";

export const FETCH_PROJECTS_ATTEMPT = "FETCH_PROJECTS_ATTEMPT";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAIL = "FETCH_PROJECTS_FAIL";

export const FETCH_PROJECT_ATTEMPT = "FETCH_PROJECT_ATTEMPT";
export const FETCH_PROJECT_SUCCESS = "FETCH_PROJECT_SUCCESS";
export const FETCH_PROJECT_FAIL = "FETCH_PROJECT_FAIL";

export const DELETE_PROJECT_ATTEMPT = "DELETE_PROJECT_ATTEMPT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAIL = "DELETE_PROJECT_FAIL";

export const UPDATE_PROJECT_VISUALLY = "UPDATE_PROJECT_VISUALLY";
export const UPDATE_PROJECT_ATTEMPT = "UPDATE_PROJECT_ATTEMPT";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAIL = "UPDATE_PROJECT_FAIL";

export const CHANGE_PROJECT_SORT = "CHANGE_PROJECT_SORT";

export const CLEAN_PROJECT_MESSAGE = "CLEAN_PROJECT_MESSAGE";
//////////////////////////////////////////////////

// tagReducer
export const FETCH_TAGS_ATTEMPT = "FETCH_TAGS_ATTEMPT";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAIL = "FETCH_TAGS_FAIL";

export const CREATE_TAG_ATTEMPT = "CREATE_TAG_ATTEMPT";
export const CREATE_TAG_SUCCESS = "CREATE_TAG_SUCCESS";
export const CREATE_TAG_FAIL = "CREATE_TAG_FAIL";

export const DELETE_TAG_VISUALLY = "DELETE_TAG_VISUALLY";
export const DELETE_TAG_ATTEMPT = "DELETE_TAG_ATTEMPT";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAIL = "DELETE_TAG_FAIL";

export const UPDATE_TAG_VISUALLY = "UPDATE_TAG_VISUALLY";
export const UPDATE_TAG_ATTEMPT = "UPDATE_TAG_ATTEMPT";
export const UPDATE_TAG_SUCCESS = "UPDATE_TAG_SUCCESS";
export const UPDATE_TAG_FAIL = "UPDATE_TAG_FAIL";

export const CLEAN_TAG_MESSAGE = "CLEAN_TAG_MESSAGE";
//////////////////////////////////////////////////

// dashboardReducer

export const FETCH_DASHBOARD_BAR_DATA_ATTEMPT = "FETCH_DASHBOARD_BAR_DATA_ATTEMPT";
export const FETCH_DASHBOARD_BAR_DATA_SUCCESS = "FETCH_DASHBOARD_BAR_DATA_SUCCESS";
export const FETCH_DASHBOARD_BAR_DATA_FAIL = "FETCH_DASHBOARD_BAR_DATA_FAIL";
//////////////////////////////////////////////////

// reportReducer
export const REPORT_DELETE_TASK_VISUALLY = "REPORT_DELETE_TASK_VISUALLY";
export const REPORT_DELETE_TASK_ATTEMPT = "REPORT_DELETE_TASK_ATTEMPT";
export const REPORT_DELETE_TASK_SUCCESS = "REPORT_DELETE_TASK_SUCCESS";
export const REPORT_DELETE_TASK_FAIL = "REPORT_DELETE_TASK_FAIL";

export const REPORT_UPDATE_TASK_VISUALLY = "REPORT_UPDATE_TASK_VISUALLY";
export const REPORT_UPDATE_TASK_ATTEMPT = "REPORT_UPDATE_TASK_ATTEMPT";
export const REPORT_UPDATE_TASK_SUCCESS = "REPORT_UPDATE_TASK_SUCCESS";
export const REPORT_UPDATE_TASK_FAIL = "REPORT_UPDATE_TASK_FAIL";

export const REPORT_FETCH_TASK_ATTEMPT = "REPORT_FETCH_TASK_ATTEMPT";
export const REPORT_FETCH_TASK_SUCCESS = "REPORT_FETCH_TASK_SUCCESS";
export const REPORT_FETCH_TASK_FAIL = "REPORT_FETCH_TASK_FAIL";

export const REPORT_FETCH_TASKS_ATTEMPT = "REPORT_FETCH_TASKS_ATTEMPT";
export const REPORT_FETCH_TASKS_SUCCESS = "REPORT_FETCH_TASKS_SUCCESS";
export const REPORT_FETCH_TASKS_FAIL = "REPORT_FETCH_TASKS_FAIL";

export const REPORT_UPDATE_DATE_VISUALLY = "REPORT_UPDATE_DATE_VISUALLY";

export const REPORT_LOAD_MORE_TASKS = "REPORT_LOAD_MORE_TASKS";
export const REPORT_RESET_LIMIT = "REPORT_RESET_LIMIT";

export const REPORT_COLLAPSE_DATE = "REPORT_COLLAPSE_DATE";

export const REPORT_CLEAN_TASK_MESSAGE = "REPORT_CLEAN_TASK_MESSAGE";

export const REPORT_CHANGE_FILTERS = "REPORT_CHANGE_FILTERS";