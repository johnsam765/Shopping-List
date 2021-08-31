import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types"

export const userLoading = () => {
        return {
            type: USER_LOADING
        }
    }
    // Check token and load user
export const userLoaded = (data) => {
    return {
        type: USER_LOADED,
        payload: data
    }
}
export const regFail = () => {
    return {
        type: REGISTER_FAIL
    }
}

export const regSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}
export const authError = () => {
    return {
        type: AUTH_ERROR
    }
}
export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
export const loginFail = () => {
    return {
        type: LOGIN_FAIL
    }
}
export const logSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}