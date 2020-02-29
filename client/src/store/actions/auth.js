import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';


export const registrationStart = () => {
    return {
        type: actionTypes.REGISTRATION_START
    };
};

export const registrationSuccess = () => {
    return {
        type: actionTypes.REGISTRATION_SUCCESS
    };
};

export const registrationFail = (error) => {
    return {
        type: actionTypes.REGISTRATION_FAIL,
        errorSignup: error
    };
};


export const registration = (first, last, email, password) => {
    return dispatch => {
        dispatch(registrationStart());
        const authData = {
            first: first,
            last: last,
            username: email,
            password: password
        };
        axios.post('/registration', authData)
            .then(response => {
                dispatch(registrationSuccess());
                dispatch(auth(email, password))
            })
            .catch(err => {
                dispatch(registrationFail(err));
            })
    }
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: user
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errorLogin: error
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = () => {
    return dispatch => {
        axios.get('/logout')
            .then(response => {
                localStorage.removeItem('user');
                dispatch(logoutSuccess())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            password: password
        };
        axios.post('/login', authData)
            .then(response => {
                localStorage.setItem('user', response.data.username);
                dispatch(authSuccess(response.data.username));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const user = localStorage.getItem('user');
        if (user) {
            axios.get('/myprofile/authenticated')
                .then(res => {
                    dispatch(authSuccess(user));
                })
                .catch(err => {
                    dispatch(authFail(err));
                })
            
        }
    }
}