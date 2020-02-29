import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchCollectionSuccess = (vacations) => {
    return {
        type: actionTypes.FETCH_COLLECTION_SUCCESS,
        vacations: vacations
    }
};

export const fetchCollectionFail = (error) => {
    return {
        type: actionTypes.FETCH_COLLECTION_FAIL,
        error: error
    };
};

export const fetchCollectionStart = () => {
    return {
        type: actionTypes.FETCH_COLLECTION_START
    };
};

export const fetchVacationCollection = () => {
    return dispatch => {
        dispatch(fetchCollectionStart());
        axios.get('/vacations')
            .then(res => {
               dispatch(fetchCollectionSuccess(res.data.vacations));
            })
            .catch(err => {
                dispatch(fetchCollectionFail(err));
            })
    }
}