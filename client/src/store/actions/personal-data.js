import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchDataSuccess = (personalData, admin, vacations) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        personalData: personalData,
        admin: admin,
        vacations: vacations
    }
};

export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        error: error
    };
};

export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_DATA_START
    };
};

export const fetchPersonalData = () => {
    return dispatch => {
        dispatch(fetchDataStart());
        axios.get('/myprofile')
            .then(res => {
               dispatch(fetchDataSuccess(res.data,res.data.permissions[0].admin, res.data.allVacations));
            })
            .catch(err => {
                dispatch(fetchDataFail(err));
            })
    }
};

export const deletePersonalData = () => {
    return {
        type: actionTypes.DELETE_PERSONAL_DATA
    }
}

export const followSuccess = () => {
    return {
        type: actionTypes.ADD_TO_FAVORITES
    }
};


export const followVacation = (user, id) => {
    return dispatch => {
        const followData = {
            username: user,
            idVacation: id
        };
        axios.put('/myprofile/follow', followData)
            .then(res => {
                dispatch(followSuccess())
            })
            .catch(err => {
                console.log(err)
            })
    }
};

export const unfollowSuccess = () => {
    return {
        type: actionTypes.REMOVE_FROM_FAVORITES
    }
};

export const unfollowVacation = (user, id) => {
    return dispatch => {
        const followData = {
            username: user,
            idVacation: id
        };
        axios.patch('/myprofile/unfollow', followData)
            .then(res => {
                dispatch(unfollowSuccess())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const deleteVacationSuccess = (idVacation) => {
    return {
        type: actionTypes.DELETE_VACATION,
        idVacation: idVacation
    }
}

export const deleteVacation = (id) => {
    return dispatch => {
        const deleteData = {
            idVacation: id
        };
        axios.patch('/myprofile/delete-vacation', deleteData)
            .then(res => {
                dispatch(deleteVacationSuccess(id))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const editVacationFail = () => {
    return {
        type: actionTypes.EDIT_VACATION_FAIL
    }
};

export const editVacation = (editedVacation) => {
    return dispatch => {
        axios.patch('/myprofile/update-vacation', editedVacation, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
            .then(() => {
                dispatch(fetchPersonalData());
            })
            .catch(err => {
                dispatch(editVacationFail());
            })
    }
};

export const createVacation = (createdVacation) => {
    return dispatch => {
        axios.post('/myprofile/add-vacation', createdVacation, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
            .then(res => {
                dispatch(fetchPersonalData());
            })
            .catch(err => {
                dispatch(fetchDataFail(err));
            })
    }
};