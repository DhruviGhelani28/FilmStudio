import { UserActionType } from "../Constants/UserActionType";

const initialState = {
    registerDate: {},
    loginData: {},
    users: {}
}

export const userLoginReducer = (state = initialState.loginData, action) => {
    // console.log(initialState.loginData, "\t", action)
    switch (action.type) {

        case UserActionType.USER_LOGIN_REQUEST:
            return { loading: true };
        case UserActionType.USER_LOGIN_SUCCESS:
            return { loading: false, loginData: action.payload };

        case UserActionType.USER_LOGIN_FAIL:
            return { loading: true, loginData: action.payload };

        case UserActionType.USER_LOGOUT:
            return { loading: false };

        default:
            return state;
    }
}

export const userRegisterReducer = (state = initialState.registerDate, action) => {
    switch (action.type) {
        case UserActionType.USER_REGISTER_REQUEST:
            return { loading: true };
        case UserActionType.USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case UserActionType.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const usersReducer = (state = initialState.users, action) => {
    switch (action.type) {

        case UserActionType.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case UserActionType.USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};