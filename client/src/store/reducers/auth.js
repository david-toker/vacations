import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    user: null,
    errorSignup: null,
    errorLogin: null,
    loading: false,
    authRedirectPath: '/collection'
};

const authStart = (state, action) => {
    return updateObject(state, { errorLogin: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        user: action.user,
        errorLogin: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        errorLogin: action.errorLogin,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { user: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const signupStart = (state, action) => {
    return updateObject(state, { errorSignup: null, loading: true });
};

const signupSuccess = (state, action) => {
    return updateObject(state, {
        errorSignup: null,
        loading: false
    });
};

const signupFail = (state, action) => {
    return updateObject(state, {
        errorSignup: action.errorSignup,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.REGISTRATION_START: return signupStart(state, action);
        case actionTypes.REGISTRATION_SUCCESS: return signupSuccess(state, action);
        case actionTypes.REGISTRATION_FAIL: return signupFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;